import { NextApiRequest, NextApiResponse } from 'next';
import { BeanType } from '../../../../common/types';
import { getBeanTypes } from '../../../util/database';

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
