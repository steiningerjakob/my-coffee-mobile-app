import { NextApiRequest, NextApiResponse } from 'next';
import {
  checkFavouriteStatus,
  getUserByValidSessionToken,
} from '../../../util/database';

export default async function favouriteStatusHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Get status from database
    const data = await checkFavouriteStatus(userId, beanId);

    return res.status(200).json({ data: data });
  }
  res.status(400).json(null);
}
