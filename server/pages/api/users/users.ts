import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers } from '../../../util/database';
import { User } from '../../../util/types';

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const users: User[] = await getAllUsers();

    if (users) {
      return res.status(200).json({ users: users });
    } else {
      return res.status(400).json({ error: 'No users found' });
    }
  }
}
