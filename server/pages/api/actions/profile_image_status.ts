import { NextApiRequest, NextApiResponse } from 'next';
import { checkProfileImageStatus } from '../../../util/database';

export default async function checkProfileImageStatusHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { id } = req.body;

    if (!id) {
      return;
    } else {
      // Get status from database
      const profileImage = await checkProfileImageStatus(id);

      return res.status(200).json({ profileImage: profileImage });
    }
  }
  res.status(400).json(null);
}
