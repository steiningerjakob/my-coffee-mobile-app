import { NextApiRequest, NextApiResponse } from 'next';
import { checkPreferences } from '../../../util/database';

export default async function getFavouriteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId } = req.body;

    const existingPreference = await checkPreferences(userId);

    return res.status(200).json({ existingPreference: existingPreference });
  }
  res.status(400).json(null);
}
