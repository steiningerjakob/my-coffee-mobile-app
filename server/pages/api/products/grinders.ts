import { NextApiRequest, NextApiResponse } from 'next';
import { getAllGrinders } from '../../../util/database';
import { Grinder } from '../../../util/types';

export default async function grindersHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const grinders: Grinder[] = await getAllGrinders();

    return res.status(200).json({ grinders: grinders });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
