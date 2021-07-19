import { NextApiRequest, NextApiResponse } from 'next';
import { updatePreference } from '../../../util/database';

export default async function updatePreferenceHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { userId, beanType, body, intensity, acidity } = req.body;

    // Update database entries
    const updatedPreference = await updatePreference(
      userId,
      beanType,
      body,
      intensity,
      acidity,
    );

    return res.status(200).json({
      message: 'Updated preference',
      updatedPreference: updatedPreference,
    });
  }
  res.status(400).json(null);
}
