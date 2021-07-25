import argon2 from 'argon2';
// eslint-disable-next-line
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedSessionTokenCookie } from '../../../util/cookies';
import {
  deleteExpiredSessions,
  insertSession,
  insertUser,
} from '../../../util/database';

export default async function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { firstName, lastName, email, password } = req.body;

    // Create a hash of the password to save in the database
    const passwordHash = await argon2.hash(password);

    // Insert user into database users table
    const user = await insertUser(firstName, lastName, email, passwordHash);

    // Clean up expired sessions
    await deleteExpiredSessions();

    // Generate token consisting of a long string of letters
    // and number, which will serve as a record that the user
    // at one point did log in correctly
    const token = crypto.randomBytes(64).toString('base64');

    // Save the token to the database (with an automatically
    // generated expiry of 24 hours)
    const session = await insertSession(token, user.id);

    const cookie = createSerializedSessionTokenCookie(session.token);

    return res.status(200).setHeader('Set-Cookie', cookie).json({ user: user });
  }
  res.status(400).json(null);
}
