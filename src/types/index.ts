export interface Tile {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  currency: string;
  dimensions: string;
  material: string;
  inStock: boolean;
  tags: string[];
  creator: string;
  style: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
