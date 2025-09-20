import { NextApiResponse } from 'next';
import { NextIronRequest, withSession } from 'src/auth/session';
import { Routes } from 'src/constants/route';
import { apiInstanceAuthentication } from 'src/providers/authProvider';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default withSession(async (request: NextIronRequest, res: NextApiResponse) => {
  try {
    let url: any = '';
    let body: any = null;

    if (request.method == 'GET' || request.method == 'DELETE') {
      const { url: link, ...others } = request.query;
      url = link;

      const data = await apiInstanceAuthentication({
        request,
        url,
        data: null,
        params: others,
      });
      return res.status(data?.status).send(data?.data || []);
    }

    if (request.method == 'POST' || request.method == 'PUT' || request.method == 'PATCH') {
      const { url: link, ...others } = request.body;
      url = link;
      body = others;
    }

    const data = await apiInstanceAuthentication({
      request,
      url,
      data: body,
      params: request.query,
    });
    return res.status(data?.status).send(data?.data || []);
  } catch (error: any) {
    if (error?.response?.data.statusCode === 401 || error?.response?.status === 401) {
      request.session?.destroy();
      request.push(`${Routes.SIGN_IN}?action=logout`);
      res.end();
      return;
    }

    return res.status(error?.response?.data.statusCode || error?.response?.status || 500).send(error?.response?.data || []);
  }
});
