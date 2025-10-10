import { useQuery } from '@tanstack/react-query';
import firestoreService from 'src/libs/firebase/service';
import endpoints from 'src/services/endpoints';
import { Category } from 'src/types/admin/categories';

export type Request = {
  slug: string;
};

export type Response = {
  data: Category;
};

export function getDetailCategory(request: Request) {
  return firestoreService.getByCondition('category', 'slug', '==', request.slug);
}

const useCategoryDetail = (request: Request) => {
  return useQuery({
    queryKey: [endpoints.ADMIN_SETTINGS_CATEGORIES_GET_DETAIL, request.slug],
    queryFn: () => getDetailCategory(request),
    enabled: !!request.slug,
  });
};

export default useCategoryDetail;
