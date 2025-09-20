import type { NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { url, ...body } = JSON.parse(req.body);

    if (!url) {
      return res.status(400).json({ error: 'Missing url' });
    }

    const upstreamRes = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_AI}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [process.env.HEADER_API_KEY || 'x-api-key']: process.env.API_KEY || '',
      },
      body: JSON.stringify(body),
    });

    if (!upstreamRes.body) {
      return res.status(500).json({ error: 'No response body' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const reader = upstreamRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        res.write(decoder.decode(value, { stream: true }));
        res.flush();
      }
    }

    res.end();
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
