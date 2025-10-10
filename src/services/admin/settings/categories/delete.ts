import { useMutation } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { Category } from 'src/types/admin/categories';
import { PagingDataResponse } from 'src/types/paging';

export type Request = {
  id: string;
};

export type Response = {
  data: PagingDataResponse<Category>;
};

export function deleteCategory(request: Request) {
  return firestoreService.delete('category', request.id);
}

const useDeleteCategory = () => {
  return useMutation({
    mutationKey: [endpoints.ADMIN_SETTINGS_CATEGORIES_GET_LIST],
    mutationFn: deleteCategory,
  });
};

export default useDeleteCategory;
