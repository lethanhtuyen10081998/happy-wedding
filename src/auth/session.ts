import { NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';
import { DEFAULT_LANGUAGE } from 'src/constants/constants';
import { Routes } from 'src/constants/route';

import { COOKIE_TOKEN_KEY, COOKIE_TOKEN_NAME } from './cookie';

export type NextIronRequest = NextApiRequest & {
  session: Session;
  req: NextIronRequest;
  res: NextApiResponse;
  params: any;
  locale?: string;
};
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => Promise<any>;

const currentTime = Date.now();
const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
const time = currentTime + oneYearInMilliseconds;
const expirationTime = new Date(time);

export const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, {
    password: process.env.NEXT_PUBLIC_SESSION_PASSWORD_KEY || 'PASS_TEST_PRODUCTION_KEY_SESSION',
    cookieName: COOKIE_TOKEN_NAME,
    cookieOptions: {
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      expires: expirationTime,
    },
  });

export const serverSideAuthentication = (handler: NextIronHandler) => {
  return withSession(async (request: NextIronRequest, response: NextApiResponse) => {
    const access_token = request.req.session.get(COOKIE_TOKEN_KEY);

    if (!access_token) {
      return {
        redirect: {
          destination: Routes.SIGN_IN,
        },
      };
    }

    return handler(request, response);
  });
};

export const serverSideUnAuthentication = (handler: NextIronHandler) => {
  return withSession(async (request: NextIronRequest, response: NextApiResponse) => {
    const access_token = request.req.session.get(COOKIE_TOKEN_KEY);

    if (access_token) {
      return {
        redirect: {
          destination: '/' + request?.locale || DEFAULT_LANGUAGE,
        },
      };
    }
    return handler(request, response);
  });
};

export const serverSideSellerAuthentication = (handler: NextIronHandler) => {
  return withSession(async (request: NextIronRequest, response: NextApiResponse) => {
    const access_token = request.req.session.get(COOKIE_TOKEN_KEY);
    //@TODO: Implement this function
    // 1. Get user info
    // 2. Check user role
    // 3. Check user role is seller or not
    // 4. If user role is seller, return handler(request, response);
    // 5. If user role is not seller, return {
    //     redirect: {
    //       destination: '/' + request?.locale || 'vn',
    //     },
    //   };

    if (access_token) {
      return {
        redirect: {
          destination: '/' + request?.locale || 'vn',
        },
      };
    }
    return handler(request, response);
  });
};
