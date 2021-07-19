import { NextApiResponse } from 'next';
import { getAllUsers } from '../../../util/database';
import { User } from '../../../util/types';

export default async function usersHandler(res: NextApiResponse) {
  const users: User = await getAllUsers();

  return res.status(200).json({ users: users });
}
