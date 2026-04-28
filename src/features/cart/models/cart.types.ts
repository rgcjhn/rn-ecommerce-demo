import { Product } from "@/features/products/models/product.types";

export interface CartItem extends Product {
  quantity: number;
}
