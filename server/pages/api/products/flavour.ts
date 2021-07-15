import { NextApiRequest, NextApiResponse } from 'next';
import { getFlavourProfileById } from '../../../util/database';
import { FlavourProfile } from '../../../util/types';

export default async function flavourProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.body.id;

  const flavour: FlavourProfile = await getFlavourProfileById(id);

  return res.status(200).json({ flavour: flavour });
}
