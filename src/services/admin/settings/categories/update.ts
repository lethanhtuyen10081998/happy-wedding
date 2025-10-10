import { useMutation } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { Category } from 'src/types/admin/categories';
import { PagingDataResponse } from 'src/types/paging';

export type Request = {
  name: string;
  id: string;
  slug: string;
  isMenu?: boolean;
};

export type Response = {
  data: PagingDataResponse<Category>;
};

export function updateCategory(request: Request) {
  return firestoreService.update('category', request.id, {
    name: request.name,
    slug: request.slug,
  });
}

const useUpdateCategory = () => {
  return useMutation({
    mutationKey: [endpoints.ADMIN_SETTINGS_CATEGORIES_GET_LIST],
    mutationFn: updateCategory,
  });
};

export default useUpdateCategory;
