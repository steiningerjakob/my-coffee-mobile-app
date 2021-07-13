import { NextApiRequest, NextApiResponse } from 'next';
import { getBeansBySeller } from '../../../util/database';

export default async function getBeansBySellerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { sellerName } = req.body;

    const beans = await getBeansBySeller(sellerName);

    return res.status(200).json({ beans: beans });
  }
  res.status(400).json(null);
}
