import { NextApiRequest, NextApiResponse } from 'next';
import { updateProfileImage } from '../../../util/database';

export default async function updateProfileImageHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    // Destructure relevant information from the request body
    const { id, profileImage } = req.body;

    // Update database entries
    const updatedProfileImage = await updateProfileImage(id, profileImage);

    return res.status(200).json({
      message: 'Updated profile image',
      updatedProfileImage: updatedProfileImage,
    });
  }
  res.status(400).json(null);
}
