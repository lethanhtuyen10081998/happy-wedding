import axios from 'axios';
import { COOKIE_TOKEN_KEY } from 'src/auth/cookie';
import { NextIronRequest, withSession } from 'src/auth/session';

export default withSession(async (request: NextIronRequest, res: any) => {
  if (request.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { url, ...body } = request.body;

    if (!url) {
      return res.status(400).json({ error: 'Missing url' });
    }

    const accessToken = request.session.get(COOKIE_TOKEN_KEY);

    const upstreamRes = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_N8N}${url}`, body, {
      headers: {
        'Content-Type': 'application/json',
        [process.env.HEADER_API_KEY || 'x-api-key']: process.env.API_KEY || '',
        Authorization: `${accessToken}`,
        'fact-no': process.env.NEXT_PUBLIC_FACT_NO || '',
      },
    });

    if (!upstreamRes.data) {
      return res.status(500).json({ error: 'No response body' });
    }

    return res.status(upstreamRes.status).json(upstreamRes.data.output);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
