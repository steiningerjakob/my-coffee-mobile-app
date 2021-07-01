import { NextApiRequest, NextApiResponse } from 'next';
import { insertFavourite } from '../../../util/database';

export default async function addFavouriteHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanId } = req.body;

    // Insert into database
    const newFavourite = await insertFavourite(userId, beanId);

    return res
      .status(200)
      .json({ message: 'Added to favourites', newFavourite: newFavourite });
  }
  res.status(400).json(null);
}
