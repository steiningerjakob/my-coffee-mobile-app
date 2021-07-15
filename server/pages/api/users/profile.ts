import { NextApiRequest, NextApiResponse } from 'next';
import { getUserByValidSessionToken } from '../../../util/database';
import { User } from '../../../util/types';

export default async function profileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;

  if (sessionToken) {
    const user: User = await getUserByValidSessionToken(sessionToken);

    return res.status(200).json({ user: user });
  } else {
    return res.status(200).json(undefined);
  }
}
