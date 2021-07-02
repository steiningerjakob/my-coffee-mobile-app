import { NextApiRequest, NextApiResponse } from 'next';
import { insertReview } from '../../../util/database';

export default async function addReviewHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId, rating, review } = req.body;

    // Insert into database
    const newRating = await insertReview(userId, beanId, rating, review);

    return res
      .status(200)
      .json({ message: 'Added review', newRating: newRating });
  }
  res.status(400).json(null);
}
