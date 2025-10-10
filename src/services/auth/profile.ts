import { useQuery } from '@tanstack/react-query';
import { internalApiInstance } from 'src/providers/authProvider';
import { UserProfile } from 'src/types/user';

import endpoints from '../endpoints';

export type Response = {
  data: UserProfile;
};

export function getProfile(): Promise<Response> {
  return internalApiInstance.get(endpoints.PROFILE);
}

const useGetProfile = () => {
  const { data, ...others } = useQuery({
    queryKey: [endpoints.PROFILE],
    queryFn: () => getProfile(),
  });

  return {
    data,
    ...others,
  };
};

export default useGetProfile;
