import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUser } from '../../../util/database';

export default async function deleteUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
