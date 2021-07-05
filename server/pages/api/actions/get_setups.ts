import { NextApiRequest, NextApiResponse } from 'next';
import { getUserSetups } from '../../../util/database';

export default async function getFavouriteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId } = req.body;

    const userSetups = await getUserSetups(userId);

    return res.status(200).json({ userSetups: userSetups });
  }
  res.status(400).json(null);
}
