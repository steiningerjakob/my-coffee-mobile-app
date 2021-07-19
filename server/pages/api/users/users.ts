import { NextApiResponse } from 'next';
import { getAllUsers } from '../../../util/database';
import { User } from '../../../util/types';

export default async function usersHandler(res: NextApiResponse) {
  const users: User[] = await getAllUsers();

  if (users) {
    return res.status(200).json({ users: users });
  } else {
    return res.status(400).json({ error: 'No users found' });
  }
}
