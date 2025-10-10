import { useQuery } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { Product } from 'src/types/product';

export type Request = {
  id: string;
};

export type Response = {
  data: Product;
};

export function getProductDetail(request: Request) {
  return firestoreService.get<Product>('product', request.id);
}

const useDetail = (request: Request, enabled?: boolean) => {
  const { data, ...others } = useQuery({
    queryKey: [endpoints.ADMIN_MANAGE_PRODUCTS_GET_LIST, request],
    queryFn: () => getProductDetail(request),
    enabled: enabled,
  });

  return {
    data: data || null,
    ...others,
  };
};

export default useDetail;
