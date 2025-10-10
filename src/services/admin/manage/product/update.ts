import { useMutation } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { Product } from 'src/types/product';

export type Request = Product;

export function updateProduct(request: Request) {
  const { id, ...rest } = request;
  return firestoreService.update('product', request.id, rest);
}

const useUpdateProduct = () => {
  return useMutation({
    mutationKey: [endpoints.ADMIN_MANAGE_PRODUCTS_GET_LIST],
    mutationFn: updateProduct,
  });
};

export default useUpdateProduct;
