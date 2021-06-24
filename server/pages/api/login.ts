import argon2 from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next';
import { LoginResponse } from '../../../common/types';
import { getUserWithPasswordHashByEmail } from '../../util/database';

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

    // Check that the entered plaintext password matches with the
    // password hash stored in the database
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

    const { passwordHash, ...user } = userWithPasswordHash;

    return res.status(200).json({ user: userWithPasswordHash });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
