import { useMutation } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { Category } from 'src/types/admin/categories';
import { PagingDataResponse } from 'src/types/paging';

export type Request = {
  name: string;
  slug: string;
  isMenu?: boolean;
};

export type Response = {
  data: PagingDataResponse<Category>;
};

export function createCategory(request: Request) {
  return firestoreService.create('category', request);
}

const useCreateCategory = () => {
  return useMutation({
    mutationKey: [endpoints.ADMIN_SETTINGS_CATEGORIES_GET_LIST],
    mutationFn: createCategory,
  });
};

export default useCreateCategory;
