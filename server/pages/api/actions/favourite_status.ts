import { NextApiRequest, NextApiResponse } from 'next';
import { checkFavouriteStatus } from '../../../util/database';

export default async function ckeckFavouriteStatusHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Get status from database
    const favourite = await checkFavouriteStatus(userId, beanId);

    return res.status(200).json({ favourite: favourite });
  }
  res.status(400).json(null);
}
