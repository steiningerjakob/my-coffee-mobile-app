import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByValidSessionToken,
  getUserFavourites,
} from '../../../util/database';

export default async function userFavouritesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId } = req.body;

    const userFavourites = await getUserFavourites(userId);
    console.log('api routes', userFavourites);

    return res.status(200).json({ userFavourites: userFavourites });
  }
}
