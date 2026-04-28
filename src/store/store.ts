import { configureStore } from "@reduxjs/toolkit";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

import { productsApi } from "@/features/products/api/productsApi";
import cartReducer from "@/features/cart/store/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,

    [productsApi.reducerPath]: productsApi.reducer,
  },
  devTools: false, // Disable built-in to avoid conflicts
  enhancers: (getDefault) => getDefault().concat(devToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
