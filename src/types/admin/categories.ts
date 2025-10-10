export type Category = {
  id: string;
  name: string;
  slug: string;
  isMenu?: boolean;
};

export type CategoryRequest = {
  name: string;
  description: string;
  slug: string;
};
