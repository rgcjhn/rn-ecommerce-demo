import { Product } from "@/features/products/models/product.types";

export type RootStackParamList = {
  Products: undefined;
  ProductDetails: { product: Product };

  Cart: undefined;
};
