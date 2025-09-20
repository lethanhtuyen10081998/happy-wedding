import { useQuery } from '@tanstack/react-query';
import { internalApiInstance } from 'src/providers/authProvider';
import { PagingDataRequest, PagingDataResponse } from 'src/types/paging';
import { VisaOfUser } from 'src/types/user';

import endpoints from '../endpoints';

export type Request = PagingDataRequest & {
  customerId: string;
  deptNo: string;
};

export type ResponseUserProfile = {
  data: PagingDataResponse<VisaOfUser>;
};

export function getListVisaOfUser(request: Request): Promise<ResponseUserProfile> {
  return internalApiInstance.get(endpoints.LOCAL_API_PREFIX_AUTH, {
    params: {
      url: endpoints.USER_LIST_VISA_OF_USER,
      ...request,
    },
  });
}

const useListVisaOfUser = (request: Request) => {
  return useQuery({
    queryKey: [endpoints.USER_LIST_VISA_OF_USER, request.customerId, request.deptNo],
    queryFn: () => getListVisaOfUser(request),
    enabled: !!request.customerId && !!request.deptNo,
  });
};

export default useListVisaOfUser;
