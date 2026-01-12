import router from 'next/router';
import { useCallback, useState } from 'react';
import useSnackbar from 'src/components/material/Snackbar/useSnackbar';
import { Routes } from 'src/constants/route';
import { useAPIProfileContext } from 'src/context/profileContext/provider';
import { internalApiInstance } from 'src/providers/authProvider';
import { UserProfile } from 'src/types/user';

import endpoints from '../endpoints';

export type RequestSignIn = {
  username: string;
  password: string;
};

export type ResponseSignIn = {
  data: {
    access_token: string;
    refresh_token: string;
    profile: UserProfile;
  };
};

export function signIn(request: RequestSignIn): Promise<ResponseSignIn> {
  return internalApiInstance.post(endpoints.SIGN_IN, request);
}

const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const { onUpdateProfile } = useAPIProfileContext();

  const mutation = useCallback(
    async (request: RequestSignIn) => {
      setLoading(true);

      return signIn(request)
        .then((response) => {
          enqueueSnackbar('Đăng nhập thành công', {
            variant: 'success',
          });
          console.log(response);
          onUpdateProfile(response.data.profile);
          router.push(Routes.ADMIN_MANAGE_PRODUCTS);
          return response;
        })
        .catch((error) => {
          enqueueSnackbar(error?.response?.data?.message || error?.message, {
            variant: 'error',
          });
          return error;
        })
        .finally(() => setLoading(false));
    },
    [enqueueSnackbar, onUpdateProfile],
  );

  return {
    mutation,
    loading,
  };
};

export default useSignIn;
