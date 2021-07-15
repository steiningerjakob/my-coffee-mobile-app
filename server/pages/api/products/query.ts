import { NextApiRequest, NextApiResponse } from 'next';
import { getFilteredBeans } from '../../../util/database';
import { Bean } from '../../../util/types';

export default async function searchQueryHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.body.query;

  const filteredBeans: Bean[] = await getFilteredBeans(query);

  if (filteredBeans) {
    return res.status(200).json({ filteredBeans: filteredBeans });
  } else {
    return res.status(200).json({ message: 'No matches found...' });
  }
}
