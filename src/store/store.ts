import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

import { productsApi } from "@/features/products/api/productsApi";
import cartReducer from "@/features/cart/store/cartSlice";
import productsReducer from "@/features/products/store/productsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Persist settings
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  // Only persist cart
  whitelist: ["cart", "products"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,

  [productsApi.reducerPath]: productsApi.reducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer and middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {
        warnAfter: 100,
      },
    }).concat(productsApi.middleware),
  devTools: false, // Disable built-in to avoid conflicts
  enhancers: (getDefault) => getDefault().concat(devToolsEnhancer()),
});

// Persistor for root component
export const persistor = persistStore(store);

// For debugging
persistStore(store, null, () => {
  console.log("Redux Persist rehydration complete");
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
