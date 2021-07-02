import { NextApiRequest, NextApiResponse } from 'next';
import { updateReview } from '../../../util/database';

export default async function updateReviewHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { userId, beanId, rating, review } = req.body;

    // Update database entries
    const updatedRating = await updateReview(userId, beanId, rating, review);

    return res
      .status(200)
      .json({ message: 'Updated review', updatedRating: updatedRating });
  }
  res.status(400).json(null);
}
