// pages/api/s3/upload-file.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadImage } from 'src/libs/s3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fileUrl = await uploadImage(req.body, 'uploads', 'test.jpg');

    return res.status(200).json({ fileUrl });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
