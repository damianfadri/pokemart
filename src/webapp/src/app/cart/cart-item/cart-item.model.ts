import { Product } from "../../products/product-card/product.model";

export interface CartItem {
  product: Product,
  quantity: number;
}