export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductReview = {
  id: string;
  userName: string;
  avatar?: string;
  rating: string;
  date: string;
  comment: string;
  verified?: boolean;
};

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
  slug?: string;
  // E-commerce fields
  specifications?: ProductSpecification[];
  highlights?: string[];
  reviews?: ProductReview[];
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  inStock?: boolean;
  stockCount?: number;
};
