import { useQuery } from '@tanstack/react-query';
import { WhereFilterOp } from 'firebase/firestore';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { PagingDataRequest, PagingDataResponse } from 'src/types/paging';
import { Product } from 'src/types/product';

export type Request = PagingDataRequest & {
  categoryId?: string;
  name?: string;
  price?: number;
  toPrice?: number;
  isShowHomePage?: boolean;
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
};

export type Response = {
  data: PagingDataResponse<Product>;
};

export function getList(request: Request) {
  const conditions: { field: string; op: WhereFilterOp; value: unknown }[] = [];
  const orderByField = request.orderByField || 'price';
  const orderDirection = request.orderDirection || 'asc';

  if (request.categoryId) {
    conditions.push({ field: 'categoryId', op: '==', value: request.categoryId });
  }
  if (!!request.name) {
    conditions.push({ field: 'name', op: 'in', value: request.name });
  }
  if (request.price !== undefined) {
    conditions.push({ field: 'price', op: '>=', value: request.price });
  }
  if (request.toPrice !== undefined) {
    conditions.push({ field: 'price', op: '<=', value: request.toPrice });
  }
  if (request.isShowHomePage !== undefined) {
    conditions.push({ field: 'isShowHomePage', op: '==', value: request.isShowHomePage });
  }

  return firestoreService.list<Product>('product', {
    pageSize: request.limit,
    conditions,
    // Temporarily disable orderBy to test without index
    orderByField: orderByField || undefined,
    orderDirection: orderDirection || undefined,
  });
}

const useList = (request: Request) => {
  const { data, ...others } = useQuery({
    queryKey: [`${endpoints.ADMIN_MANAGE_PRODUCTS_GET_LIST}-${request.categoryId}`, request],
    queryFn: () => getList(request),
  });

  return {
    data: data?.rows || [],
    total: data?.total || 0,
    ...others,
  };
};

export default useList;
