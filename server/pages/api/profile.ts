import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByValidSessionToken } from '../../util/database';

export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;

  const user = await getUserByValidSessionToken(sessionToken);
  console.log('user', user);

  return res.status(200).json({ user: user });
}
