import { NextApiRequest, NextApiResponse } from 'next';
import { getReviewsByBeanId } from '../../../util/database';
import { UserRating } from '../../../util/types';

export default async function reviewsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { beanId } = req.body;

    const userReviews: UserRating[] = await getReviewsByBeanId(beanId);

    return res.status(200).json({ userReviews: userReviews });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
