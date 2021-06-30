import { NextApiRequest, NextApiResponse } from 'next';
import { FlavourProfile } from '../../../../common/types';
import { getFlavourProfileById } from '../../../util/database';

export default async function flavourProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.body.id;

  const flavour: FlavourProfile = await getFlavourProfileById(id);

  return res.status(200).json({ flavour: flavour });
}
