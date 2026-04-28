import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../models/product.types";

interface ProductsState {
  byId: Record<number, Product>;
  allIds: number[];
  total: number;
}

const initialState: ProductsState = {
  byId: {},
  allIds: [],
  total: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Cache products from RTK Query response
    cacheProducts: (
      state,
      action: PayloadAction<{
        products: Product[];
        total: number;
        append?: boolean;
      }>,
    ) => {
      const { products, total, append = false } = action.payload;

      // Add/update products
      products.forEach((product) => {
        state.byId[product.id] = product;
      });

      // Handle IDs
      const newIds = products.map((p) => p.id);
      if (append) {
        // Append for pagination
        const existingIds = new Set(state.allIds);
        const uniqueNewIds = newIds.filter((id) => !existingIds.has(id));
        state.allIds.push(...uniqueNewIds);
      } else {
        // Replace for fresh load
        state.allIds = newIds;
      }

      state.total = total;
    },

    // Clear all cached products
    clearProducts: (state) => {
      state.byId = {};
      state.allIds = [];
      state.total = 0;
    },
  },
});

export const { cacheProducts, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
