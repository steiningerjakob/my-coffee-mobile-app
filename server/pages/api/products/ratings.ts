import { NextApiRequest, NextApiResponse } from 'next';
import { Rating } from '../../../../common/types';
import { getAllRatings } from '../../../util/database';

export default async function ratingsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const ratings: Rating[] = await getAllRatings();

    return res.status(200).json({ ratings: ratings });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
