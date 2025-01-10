import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

const initialState: Product[] = [];

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialState,
  },
  reducers: {
    addToCart: (state, action) => {

    },
    removeFromCart: (state, action) => {
    },
    updateQuantity: (state, action) => {

    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;