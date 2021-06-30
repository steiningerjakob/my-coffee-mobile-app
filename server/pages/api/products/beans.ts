import { NextApiRequest, NextApiResponse } from 'next';
import { Bean } from '../../../../common/types';
import { getAllBeans } from '../../../util/database';

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
