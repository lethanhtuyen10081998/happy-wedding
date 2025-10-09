// pages/api/s3/upload-file.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteFile } from 'src/libs/s3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await deleteFile(req.body.url);

    return res.status(200).json({ status: 'success' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
