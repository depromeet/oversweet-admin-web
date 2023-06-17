import { NextApiRequest, NextApiResponse } from 'next';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!!,
  region: process.env.AWS_REGION!!,
  signatureVersion: 'v4',
});

export default async function uploadImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fileName = `${Date.now()}_test`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!!,
      Key: fileName,
      ACL: 'public-read',
    };

    const url = await s3.getSignedUrlPromise('putObject', params);
    res.status(200).json({ url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error, keys: process.env, body: req.body });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    }
  }
}