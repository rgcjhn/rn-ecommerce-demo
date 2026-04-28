import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Product } from "@/features/products/models/product.types";
import { CartItem } from "../models/cart.types";
import { calculateTotals } from "../utils/cartUtils";

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      const { totalQuantity, totalPrice } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalPrice = totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
