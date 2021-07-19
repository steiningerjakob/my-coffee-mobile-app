import { NextApiRequest, NextApiResponse } from 'next';
import { deleteReview } from '../../../util/database';

export default async function deleteReviewHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Remove from database
    const deletedReview = await deleteReview(userId, beanId);

    return res.status(200).json({
      message: 'Deleted review',
      deletedReview: deletedReview,
    });
  }
  res.status(400).json(null);
}
