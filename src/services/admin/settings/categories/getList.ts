import { useQuery } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { Category } from 'src/types/admin/categories';
import { PagingDataRequest, PagingDataResponse } from 'src/types/paging';

export type Request = PagingDataRequest & {
  username?: string;
  branchNo?: string;
  phone?: string;
  email?: string;
  fullName?: string;
  factNo?: string;
  role?: string;
};

export type Response = {
  data: PagingDataResponse<Category>;
};

export function getListUser(request: Request) {
  return firestoreService.list<Category>('category', {
    pageSize: request.limit,
  });
}

const useListUser = (request: Request) => {
  const { data, ...others } = useQuery({
    queryKey: [endpoints.ADMIN_SETTINGS_CATEGORIES_GET_LIST, request],
    queryFn: () => getListUser(request),
  });

  return {
    data: data?.rows || [],
    total: data?.total || 0,
    ...others,
  };
};

export default useListUser;
