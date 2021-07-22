import argon2 from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteUser,
  getUserByValidSessionToken,
  updateUser,
} from '../../../util/database';

export default async function editUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ user: user });
  }

  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { id, firstName, lastName, email, password } = req.body;

    // Create a hash of the password to save in the database
    const passwordHash = await argon2.hash(password);

    // Insert user into database users table
    const updatedUser = await updateUser(
      id,
      firstName,
      lastName,
      email,
      passwordHash,
    );
    return res
      .status(200)
      .json({ message: 'User profile updated', updatedUser: updatedUser });
  }

  if (req.method === 'DELETE') {
    // Destructure relevant information from the request body
    const { email } = req.body;

    // Remove from database
    const deletedUser = await deleteUser(email);

    return res.status(200).json({
      message: 'User profile deleted',
      deletedUser: deletedUser,
    });
  }

  res.status(400).json(null);
}
