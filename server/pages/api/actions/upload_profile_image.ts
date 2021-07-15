import { NextApiRequest, NextApiResponse } from 'next';
import { updateProfileImage } from '../../../util/database';

export default async function uploadProfileImageHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
    console.log('image', image);

    updateProfileImage(id, image.url);

    return res
      .status(200)
      .json({ message: 'Uploaded profile picture', imageURL: image.url });
  }
  res.status(400).json(null);
}
