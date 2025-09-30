import { Category } from 'src/types/admin/categories';
import { Product } from 'src/types/product';

export type EditorFormRequest = Omit<Product, 'categoryId'> & {
  categoryId?: Category | null;
};
