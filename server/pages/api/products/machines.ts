import { NextApiRequest, NextApiResponse } from 'next';
import { Machine } from '../../../../common/types';
import { getAllMachines } from '../../../util/database';

export default async function machinesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const machines: Machine[] = await getAllMachines();

    return res.status(200).json({ machines: machines });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
