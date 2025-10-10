import { useMutation } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { PagingDataResponse } from 'src/types/paging';
import { Product } from 'src/types/product';

export type Request = Omit<Product, 'id'>;

export type Response = {
  data: PagingDataResponse<Product>;
};

export function createCategory(request: Request) {
  return firestoreService.create('product', request);
}

const useCreateCategory = () => {
  return useMutation({
    mutationKey: [endpoints.ADMIN_MANAGE_PRODUCTS_GET_LIST],
    mutationFn: createCategory,
  });
};

export default useCreateCategory;
