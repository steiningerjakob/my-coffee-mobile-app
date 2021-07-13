import { NextApiRequest, NextApiResponse } from 'next';
import { Seller } from '../../../../common/types';
import { getAllSellers } from '../../../util/database';

export default async function sellersHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const sellers: Seller[] = await getAllSellers();

    return res.status(200).json({ sellers: sellers });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
