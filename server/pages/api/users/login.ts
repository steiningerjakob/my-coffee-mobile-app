import argon2 from 'argon2';
// eslint-disable-next-line unicorn/prefer-node-protocol
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedSessionTokenCookie } from '../../../util/cookies';
import {
  deleteExpiredSessions,
  getUserWithPasswordHashByEmail,
  insertSession,
} from '../../../util/database';
import { LoginResponse } from '../../../util/types';

export default async function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { email, password } = req.body;

    // Get the user from the database with the email
    const userWithPasswordHash = await getUserWithPasswordHashByEmail(email);

    // If a matching user does not exist in the database, return a
    // 401 Unauthorized status code and an error
    if (!userWithPasswordHash) {
      return res
        .status(401)
        .json({ errors: [{ message: 'Username or password did not match' }] });
    }

    // Check that the entered plaintext password matches with the password hash stored in the database
    const passwordMatches = await argon2.verify(
      userWithPasswordHash.passwordHash,
      password,
    );

    // If the password doesn't match the password hash, return a
    // 401 Unauthorized status code and an error
    if (!passwordMatches) {
      return res
        .status(401)
        .json({ errors: [{ message: 'Username or password did not match' }] });
    }

    // Clean up expired sessions
    await deleteExpiredSessions();

    // Generate token consisting of a long string of letters
    // and number, which will serve as a record that the user
    // at one point did log in correctly
    const token = crypto.randomBytes(64).toString('base64');

    // Save the token to the database (with an automatically
    // generated expiry of 24 hours)
    const session = await insertSession(token, userWithPasswordHash.id);

    const cookie = createSerializedSessionTokenCookie(session.token);

    const { passwordHash, ...user } = userWithPasswordHash;

    return res.status(200).setHeader('Set-Cookie', cookie).json({ user: user });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
