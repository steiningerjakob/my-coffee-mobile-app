import { NextApiRequest, NextApiResponse } from 'next';
import { removeSetup } from '../../../util/database';

export default async function removeFavouriteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
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
