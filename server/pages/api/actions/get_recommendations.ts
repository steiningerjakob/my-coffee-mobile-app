import { NextApiRequest, NextApiResponse } from 'next';
import { getRecommendations } from '../../../util/database';

export default async function getRecommendationsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { body, acidity, intensity } = req.body;

    const recommendations = await getRecommendations(body, acidity, intensity);

    return res.status(200).json({ recommendations: recommendations });
  }
  res.status(400).json(null);
}
