import { NextApiRequest, NextApiResponse } from 'next';
import {
  checkProfileImageStatus,
  getUserByValidSessionToken,
  updateProfileImage,
} from '../../../util/database';

export default async function profileImageHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const sessionToken = req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(sessionToken);
  if (!user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const profileImage = await checkProfileImageStatus(sessionToken);

    return res.status(200).json({ profileImage: profileImage });
  }

  if (req.method === 'POST') {
    const CLOUDINARY_URL =
      'https://api.cloudinary.com/v1_1/my-coffee-mobile-app/upload';
    // Destructure relevant information from the request body
    const { id, base64Img } = req.body;

    const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

    const data = {
      file: base64Img,
      upload_preset: UPLOAD_PRESET,
    };

    const response = await fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });

    const image = await response.json();

    updateProfileImage(id, image.url);

    return res
      .status(200)
      .json({ message: 'Uploaded profile picture', imageURL: image.url });
  }

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
