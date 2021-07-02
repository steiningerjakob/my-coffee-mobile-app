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
    const data = await checkFavouriteStatus(userId, beanId);

    return res.status(200).json({ data: data });
  }
  res.status(400).json(null);
}
