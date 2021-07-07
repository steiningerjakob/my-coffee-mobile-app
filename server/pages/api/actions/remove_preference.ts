import { NextApiRequest, NextApiResponse } from 'next';
import { clearPreferences } from '../../../util/database';

export default async function removeFavouriteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId } = req.body;

    // Remove from database
    const clearedPreference = await clearPreferences(userId);

    return res.status(200).json({
      message: 'Preferences cleared',
      clearedPreference: clearedPreference,
    });
  }
  res.status(400).json(null);
}
