import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByValidSessionToken,
  getUserSetups,
  insertSetup,
  removeSetup,
  updateSetup,
} from '../../../util/database';

export default async function userReviewsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const userSetup = await getUserSetups(sessionToken);

    return res.status(200).json({ userSetup: userSetup });
  }

  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, machineId, grinderId } = req.body;

    // Insert into database
    const newSetup = await insertSetup(userId, machineId, grinderId);

    return res.status(200).json({ message: 'Added setup', newSetup: newSetup });
  }

  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { userId, machineId, grinderId } = req.body;

    // Update in database
    const updatedSetup = await updateSetup(userId, machineId, grinderId);

    return res
      .status(200)
      .json({ message: 'Updated setup', updatedSetup: updatedSetup });
  }

  if (req.method === 'DELETE') {
    // Destructure relevant information from the request body
    const { setupId } = req.body;

    // Remove from database
    const removedSetup = await removeSetup(setupId);

    return res
      .status(200)
      .json({ message: 'Removed from setups', removeSetup: removedSetup });
  }

  res.status(400).json(null);
}
