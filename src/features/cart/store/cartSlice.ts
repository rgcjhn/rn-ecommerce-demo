import { createSlice } from "@reduxjs/toolkit";

type CartState = {};

const initialState: CartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
