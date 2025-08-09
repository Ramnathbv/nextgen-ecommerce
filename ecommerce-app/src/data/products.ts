import tshirt1 from '../assets/Tshirts/tshirt-7979852_1280.jpg';
import tshirt2 from '../assets/Tshirts/tshirt-7979854_1280.jpg';
import type { Product, ProductCategory } from '../common/interfaces/product';

export const CATEGORIES: ProductCategory[] = ['Newly Added', 'Men', 'Women', 'Kids'];

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Classic Men T-Shirt',
    price: 19.99,
    imageUrl: tshirt1,
    categories: ['Newly Added', 'Men'],
  },
  {
    id: 'p-2',
    name: 'Elegant Women Dress',
    price: 49.99,
    imageUrl: 'https://source.unsplash.com/featured/400x480?women,dress',
    categories: ['Newly Added', 'Women'],
  },
  {
    id: 'p-3',
    name: 'Kids Hoodie',
    price: 24.99,
    imageUrl: 'https://source.unsplash.com/featured/400x480?kids,hoodie',
    categories: ['Kids'],
  },
  {
    id: 'p-4',
    name: 'Men Denim Jacket',
    price: 69.99,
    imageUrl: tshirt2,
    categories: ['Men'],
  },
  {
    id: 'p-5',
    name: 'Women Cardigan',
    price: 39.99,
    imageUrl: 'https://source.unsplash.com/featured/400x480?women,cardigan',
    categories: ['Women'],
  },
  {
    id: 'p-6',
    name: 'Kids Joggers',
    price: 17.99,
    imageUrl: tshirt2,
    categories: ['Newly Added', 'Kids'],
  },
];
