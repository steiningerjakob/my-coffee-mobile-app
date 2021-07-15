import { NextApiRequest, NextApiResponse } from 'next';
import { getAllMachines } from '../../../util/database';
import { Machine } from '../../../util/types';

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
