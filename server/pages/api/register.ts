import argon2 from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next';
import { insertUser } from '../../util/database';

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
  }
  res.status(400).json(null);
}
