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
    return res.status(200).json({
      message: 'Đăng nhập thành công',
      profile: {
        fullName: 'Quản Lí',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        passportIssueDate: '1234567890',
        passportExpiryDate: '1234567890',
        visaNumber: '1234567890',
        countryCode: '1234567890',
        departmentCode: '1234567890',
        passport: '1234567890',
        customerId: '1234567890',
        factNo: '1234567890',
        branchNo: '1234567890',
        customerType: '1234567890',
        birthDate: '1234567890',
        cardNumber: '1234567890',
        note: '1234567890',
        title: '1234567890',
        faxNumber: '1234567890',
        address: '1234567890',
        password: '1234567890',
        createdBy: '1234567890',
        createdTime: '1234567890',
        updatedBy: '1234567890',
        updatedTime: '1234567890',
      },
    });
  }

  return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
});
