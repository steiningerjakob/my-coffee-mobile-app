import { NextApiRequest, NextApiResponse } from 'next';
import { insertSetup } from '../../../util/database';

export default async function addReviewHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, machineId, grinderId } = req.body;

    // Insert into database
    const newSetup = await insertSetup(userId, machineId, grinderId);

    return res.status(200).json({ message: 'Added setup', newSetup: newSetup });
  }
  res.status(400).json(null);
}
