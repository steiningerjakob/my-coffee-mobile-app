import argon2 from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '../../../util/database';

export default async function editUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { id, firstName, lastName, email, password } = req.body;
    console.log('api route id', id);
    console.log('api route draftFirstName', firstName);
    console.log('api route draftLastName', lastName);
    console.log('api route draftEmail', email);
    console.log('api route draftPassword', password);

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
  res.status(400).json(null);
}
