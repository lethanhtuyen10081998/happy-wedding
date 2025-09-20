import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import useSnackbar from 'src/components/material/Snackbar/useSnackbar';
import { Routes } from 'src/constants/route';
import { useAPIProfileContext } from 'src/context/profileContext/provider';
import { internalApiInstance } from 'src/providers/authProvider';

import endpoints from '../endpoints';

export type RequestLogout = {};

export type ResponseSignIn = {};

export function logout(): Promise<ResponseSignIn> {
  return internalApiInstance.post(endpoints.SIGN_OUT);
}

const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { onUpdateProfile } = useAPIProfileContext();

  const mutation = useCallback(async () => {
    setLoading(true);

    return logout()
      .then((response) => {
        enqueueSnackbar(t('common:logout_success'), {
          variant: 'success',
        });
        onUpdateProfile(undefined);
        router.push(Routes.SIGN_IN);
        return response;
      })
      .catch((error) => {
        enqueueSnackbar(error?.response?.data?.message || error?.message, {
          variant: 'error',
        });
        return error;
      })
      .finally(() => setLoading(false));
  }, [enqueueSnackbar, onUpdateProfile, router, t]);

  return {
    mutation,
    loading,
  };
};

export default useLogout;
