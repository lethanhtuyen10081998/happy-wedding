import { NextApiResponse } from 'next';
import { COOKIE_REFRESH_TOKEN_KEY, COOKIE_TOKEN_KEY } from 'src/auth/cookie';
import { NextIronRequest, withSession } from 'src/auth/session';

export default withSession(async (request: NextIronRequest, res: NextApiResponse) => {
  // return await apiInstance
  //   .post('/customer/sign-in', request.body)
  //   .then(async (response: ResponseSignIn) => {
  //     request.session.set(COOKIE_TOKEN_KEY, response.data.access_token);
  //     request.session.set(COOKIE_REFRESH_TOKEN_KEY, response.data.refresh_token);
  //     await request.session.save();
  //     return res.status(200).json(response.data || []);
  //   })
  //   .catch((error: { response: { status: number; data: any } }) => {
  //     return res.status(error.response.data.statusCode).json(error.response.data);
  //   });

  if (request.body.username === 'admin' && request.body.password === 'Tuyen@123') {
    request.session.set(COOKIE_TOKEN_KEY, 'admin');
    request.session.set(COOKIE_REFRESH_TOKEN_KEY, 'admin');
    await request.session.save();
    return res.status(200).json({ message: 'Đăng nhập thành công' });
  }

  return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
});
