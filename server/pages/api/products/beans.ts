import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBeans } from '../../../util/database';
import { Bean } from '../../../util/types';

export default async function beansHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const beans: Bean[] = await getAllBeans();

    return res.status(200).json({ beans: beans });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
