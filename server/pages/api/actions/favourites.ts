import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByValidSessionToken,
  getUserFavourites,
  insertFavourite,
  removeFavourite,
} from '../../../util/database';

export default async function favouritesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const userFavourites = await getUserFavourites(user.id);

    return res.status(200).json({ userFavourites: userFavourites });
  }

  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Insert into database
    const newFavourite = await insertFavourite(userId, beanId);

    return res
      .status(200)
      .json({ message: 'Added to favourites', newFavourite: newFavourite });
  }

  if (req.method === 'DELETE') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Remove from database
    const removedFavourite = await removeFavourite(userId, beanId);

    return res.status(200).json({
      message: 'Removed from favourites',
      removedFavourite: removedFavourite,
    });
  }

  res.status(400).json(null);
}
