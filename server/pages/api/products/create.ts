import { NextApiRequest, NextApiResponse } from 'next';
import { Bean } from '../../../../common/types';
import { insertBean } from '../../../util/database';

export default async function insertBeanHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const {
      productName,
      roaster,
      roasterCountry,
      origin,
      beanType,
      flavourProfile,
      price,
      amount,
      barcodeEan13,
      uri,
      pricePerKg,
      img,
      seller,
    } = req.body;

    // Insert into database
    const newBean: [Bean] = await insertBean(
      productName,
      roaster,
      roasterCountry,
      origin,
      beanType,
      flavourProfile,
      price,
      amount,
      barcodeEan13,
      uri,
      pricePerKg,
      img,
      seller,
    );

    return res
      .status(200)
      .json({ newBean: newBean, message: 'New product created' });
  }
  res.status(400).json({ errors: [{ message: 'Bad request' }] });
}
