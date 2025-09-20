import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSnackbar from 'src/components/material/Snackbar/useSnackbar';
import { internalApiInstance } from 'src/providers/authProvider';

import endpoints from '../endpoints';

export type RequestRegister = {
  first_name: string;
  last_name: string;
  dob: string;
  gender: number;
  phone: string;
};

export type ResponseRegister = {
  data: {};
};

export function updateProfile(request: RequestRegister): Promise<ResponseRegister> {
  return internalApiInstance.put(endpoints.LOCAL_API_PREFIX_AUTH, {
    url: endpoints.UPDATE_PROFILE,
    ...request,
  });
}

const useUpdateProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useCallback(
    async (request: RequestRegister) => {
      setLoading(true);

      return updateProfile(request)
        .then((response) => {
          // dispatch({ type: SET_USER_PROFILE, payload: response.data });
          return response;
        })
        .catch((error) => {
          enqueueSnackbar(error?.message, { variant: 'error' });
          return error;
        })
        .finally(() => setLoading(false));
    },
    [enqueueSnackbar],
  );

  return {
    mutation,
    loading,
  };
};

export default useUpdateProfile;
