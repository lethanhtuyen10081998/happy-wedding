import { FileUpload } from 'src/components/ui/Dropzone';
import { Category } from 'src/types/admin/categories';
import { Product, ProductReview, ProductSpecification } from 'src/types/product';

export type EditorFormRequest = Omit<Product, 'categoryId' | 'imagesList'> & {
  categoryId?: Category | null;
  images?: EditorFormImage[];
  specifications?: ProductSpecification[];
  reviews?: ProductReview[];
  highlights?: string[];
};

export enum EditorFormAction {
  UPLOAD = 'upload',
  DELETE = 'delete',
  DEFAULT = 'default',
}

export type EditorFormImage = {
  action: EditorFormAction;
  file: FileUpload;
};
