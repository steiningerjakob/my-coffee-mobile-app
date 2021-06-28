import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../util/database';

export default async function sessionValidationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // Get cookie from the browser and destructure sessionToken
    const sessionToken = req.cookies.sessionToken;

    const session = await getValidSessionByToken(sessionToken);

    // Check for valid session token and return true or false
    if (session) {
      return res.status(200).json({ hasValidSession: true });
    } else {
      return res.status(403).json({ hasValidSession: false });
    }
  }
}
