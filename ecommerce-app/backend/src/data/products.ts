export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description?: string;
  imageUrl?: string;
  category?: string;
}

export const demoProducts: Product[] = [
  {
    id: "sku_1",
    name: "Basic T‑Shirt",
    price: 1999,
    currency: "USD",
    description: "100% cotton tee",
    imageUrl: "https://via.placeholder.com/600x600?text=Tee",
    category: "apparel",
  },
  {
    id: "sku_2",
    name: "Water Bottle",
    price: 1299,
    currency: "USD",
    description: "Insulated 750ml",
    imageUrl: "https://via.placeholder.com/600x600?text=Bottle",
    category: "accessories",
  },
  {
    id: "sku_3",
    name: "Sneakers",
    price: 7999,
    currency: "USD",
    description: "Everyday comfort",
    imageUrl: "https://via.placeholder.com/600x600?text=Sneakers",
    category: "footwear",
  },
];


