import { NextApiRequest, NextApiResponse } from 'next';
import { getBeanTypes } from '../../../util/database';
import { BeanType } from '../../../util/types';

export default async function beanTypesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const beanTypes: BeanType[] = await getBeanTypes();

    return res.status(200).json({ beanTypes: beanTypes });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
