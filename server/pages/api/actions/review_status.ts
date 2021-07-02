import { NextApiRequest, NextApiResponse } from 'next';
import { checkReviewStatus } from '../../../util/database';

export default async function ckeckReviewStatusHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Get status from database
    const userEntry = await checkReviewStatus(userId, beanId);

    return res.status(200).json({ userEntry: userEntry });
  }
  res.status(400).json(null);
}
