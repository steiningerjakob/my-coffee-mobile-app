import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteReview,
  getUserByValidSessionToken,
  insertReview,
  updateReview,
} from '../../../util/database';

export default async function addReviewHandler(
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
    const { userId, beanId, rating, review } = req.body;

    // Insert into database
    const newRating = await insertReview(userId, beanId, rating, review);

    return res
      .status(200)
      .json({ message: 'Added review', newRating: newRating });
  }

  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { userId, beanId, rating, review } = req.body;

    // Update database entries
    const updatedRating = await updateReview(userId, beanId, rating, review);

    return res
      .status(200)
      .json({ message: 'Updated review', updatedRating: updatedRating });
  }

  if (req.method === 'DELETE') {
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
