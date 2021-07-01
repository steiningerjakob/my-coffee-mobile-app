import { NextApiRequest, NextApiResponse } from 'next';
import { removeFavourite } from '../../../util/database';

export default async function removeFavouriteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Remove from database
    const newFavourite = await removeFavourite(userId, beanId);

    return res.status(200).json({ message: 'Removed from favourites' });
  }
  res.status(400).json(null);
}
