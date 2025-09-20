import { NextApiResponse } from 'next';
import { NextIronRequest, withSession } from 'src/auth/session';

export default withSession(async (request: NextIronRequest, res: NextApiResponse) => {
  try {
    request.session.destroy();

    await request.session.save();
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json(error || []);
  }
});
