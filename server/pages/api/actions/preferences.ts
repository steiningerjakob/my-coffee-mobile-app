import { NextApiRequest, NextApiResponse } from 'next';
import {
  checkPreferences,
  clearPreferences,
  getUserByValidSessionToken,
  insertPreference,
  updatePreference,
} from '../../../util/database';

export default async function userPreferenceHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const existingPreference = await checkPreferences(sessionToken);

    return res.status(200).json({ existingPreference: existingPreference });
  }

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

  if (req.method === 'DELETE') {
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
