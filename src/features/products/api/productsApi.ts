import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Product,
  ProductsApiResponse,
  ProductsQueryParams,
} from "../models/product.types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // Get products with pagination
    getProducts: builder.query<ProductsApiResponse, ProductsQueryParams>({
      query: ({ limit = 20, skip = 0, select }) => {
        let url = `products?limit=${limit}&skip=${skip}`;
        if (select) url += `&select=${select}`;
        return url;
      },
      // For infinite scroll - merge new data with existing
      serializeQueryArgs: ({ queryArgs }) => {
        const { limit, skip, ...other } = queryArgs;
        return `products-${JSON.stringify(other)}`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.skip === 0) {
          return newItems;
        }
        return {
          ...newItems,
          products: [...currentCache.products, ...newItems.products],
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.skip !== previousArg?.skip;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    // Get single product by ID
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // Search products
    searchProducts: builder.query<ProductsApiResponse, string>({
      query: (searchTerm) => `products/search?q=${searchTerm}`,
    }),

    // Get products by category
    getProductsByCategory: builder.query<ProductsApiResponse, string>({
      query: (category) => `products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
