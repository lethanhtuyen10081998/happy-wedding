export type Product = {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  quantity: string;
  unit: string;
  categoryId?: string;
  tags?: string[];
  description?: string;
  imagesList: string[];
  videoUrl?: string;
};
