import { NextApiRequest, NextApiResponse } from 'next';
import { getBeansWithRatings } from '../../../util/database';
import { Rating } from '../../../util/types';

export default async function ratedBeansHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const ratedBeans: Rating[] = await getBeansWithRatings();

    return res.status(200).json({ ratedBeans: ratedBeans });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
