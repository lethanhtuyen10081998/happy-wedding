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

export async function getList(request: Request) {
  const conditions: { field: string; op: WhereFilterOp; value: unknown }[] = [];
  const orderByField = request.orderByField || 'price';
  const orderDirection = request.orderDirection || 'asc';

  if (request.categoryId) {
    conditions.push({ field: 'categoryId', op: '==', value: request.categoryId });
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

  // Firebase pagination workaround: 
  // Since Firebase uses cursor-based pagination (startAfter) not offset-based (page),
  // we fetch all matching documents and paginate on client side
  // TODO: Implement proper cursor-based pagination for better performance with large datasets
  const result = await firestoreService.list<Product>('product', {
    pageSize: undefined, // Fetch all matching documents
    conditions,
    orderByField: orderByField || undefined,
    orderDirection: orderDirection || undefined,
  });

  // Filter by name on client side (Firebase doesn't support full-text search well)
  let filteredRows = result.rows;
  if (request.name && request.name.trim()) {
    const searchTerm = request.name.toLowerCase().trim();
    filteredRows = result.rows.filter((product) => 
      product.name?.toLowerCase().includes(searchTerm)
    );
  }

  // Sort on client side if needed (already sorted by Firebase, but re-sort for consistency)
  if (orderByField) {
    filteredRows.sort((a, b) => {
      const aVal = a[orderByField as keyof Product];
      const bVal = b[orderByField as keyof Product];
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      
      const comparison = Number(aVal) - Number(bVal);
      return orderDirection === 'desc' ? -comparison : comparison;
    });
  }

  // Client-side pagination
  const startIndex = (request.page - 1) * request.limit;
  const endIndex = startIndex + request.limit;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return {
    rows: paginatedRows,
    total: filteredRows.length, // Use filtered total, not all documents total
    lastDoc: result.lastDoc,
  };
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
