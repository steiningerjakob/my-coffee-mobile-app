import { NextApiRequest, NextApiResponse } from 'next';
import { insertPreference } from '../../../util/database';

export default async function insertPreferenceHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { userId, beanType, body, intensity, acidity } = req.body;

    // Insert into database
    const newPreference = await insertPreference(
      userId,
      beanType,
      body,
      intensity,
      acidity,
    );

    return res
      .status(200)
      .json({ message: 'Added preference', newPreference: newPreference });
  }
  res.status(400).json(null);
}
