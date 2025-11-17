export interface Product {
  name: string;
  price: number;
  stock?: number;
  category?: string;
  resources?: ProductResources;
}

export interface ProductDetails {
  name: string;
  price: number;
  description: string;
  category: string;
  rarity: string;
  stock: number;
  resources: ProductResources;
}

export interface ProductResources {
  uri: string;
  spriteUri: string;
}