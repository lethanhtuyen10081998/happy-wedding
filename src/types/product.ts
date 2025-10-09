export type Product = {
  id: string;
  name: string;
  price: string | number;
  originalPrice: string | number;
  quantity: string | number;
  unit: string;
  categoryId?: string;
  tags?: string[];
  description?: string;
  imagesList?: string[];
  videoUrl?: string;
  isShowHomePage?: boolean;
};
