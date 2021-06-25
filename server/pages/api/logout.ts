import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSessionByToken } from '../../util/database';

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // Get cookie from the browser and destructure sessionToken
    const sessionToken = req.cookies.sessionToken;

    if (sessionToken) {
      await deleteSessionByToken(sessionToken);
    }

    // Instruct the browser to delete the cookie
    return res
      .status(200)
      .setHeader(
        'Set-Cookie',
        cookie.serialize('sessionToken', '', {
          maxAge: -1,
          path: '/',
        }),
      )
      .json(null);
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
