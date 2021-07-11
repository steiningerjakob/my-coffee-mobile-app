import { NextApiRequest, NextApiResponse } from 'next';
import { updateSetup } from '../../../util/database';

export default async function updateSetupHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { userId, machineId, grinderId } = req.body;

    // Update in database
    const updatedSetup = await updateSetup(userId, machineId, grinderId);

    return res
      .status(200)
      .json({ message: 'Updated setup', updatedSetup: updatedSetup });
  }
  res.status(400).json(null);
}
