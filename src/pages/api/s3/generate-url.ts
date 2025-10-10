// pages/api/s3/upload-file.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateUploadPostUrl } from 'src/libs/s3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, fields, key, fileUrl } = await generateUploadPostUrl(req.body.fileName, req.body.folder, req.body.contentType);

    return res.status(200).json({ url, fields, key, fileUrl });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
