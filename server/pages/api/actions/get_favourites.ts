import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFavourites } from '../../../util/database';

export default async function getFavouriteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId } = req.body;

    const userFavourites = await getUserFavourites(userId);

    return res.status(200).json({ userFavourites: userFavourites });
  }
  res.status(400).json(null);
}
