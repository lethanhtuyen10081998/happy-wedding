import { useQuery } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { PagingDataRequest, PagingDataResponse } from 'src/types/paging';
import { Product } from 'src/types/product';

export type Request = PagingDataRequest & {};

export type Response = {
  data: PagingDataResponse<Product>;
};

export function getList(request: Request) {
  return firestoreService.list<Product>('product', {
    pageSize: request.limit,
  });
}

const useList = (request: Request) => {
  const { data, ...others } = useQuery({
    queryKey: [endpoints.ADMIN_MANAGE_PRODUCTS_GET_LIST, request],
    queryFn: () => getList(request),
  });

  return {
    data: data?.rows || [],
    total: data?.total || 0,
    ...others,
  };
};

export default useList;
