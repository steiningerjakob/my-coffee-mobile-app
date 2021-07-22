import { NextApiRequest, NextApiResponse } from 'next';
import {
  getRecommendations,
  getUserByValidSessionToken,
} from '../../../util/database';

export default async function getRecommendationsHandler(
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
    const { body, acidity, intensity } = req.body;

    const recommendations = await getRecommendations(body, acidity, intensity);

    return res.status(200).json({ recommendations: recommendations });
  }
  res.status(400).json(null);
}
