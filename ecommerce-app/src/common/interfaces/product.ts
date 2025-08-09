export type ProductCategory = 'Newly Added' | 'Men' | 'Women' | 'Kids';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  categories: ProductCategory[];
}
