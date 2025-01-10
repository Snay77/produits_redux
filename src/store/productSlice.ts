import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
  thumbnail: string;
  category: string;
  brand: string;
  discountPercentage: number;
  stock: number;
  availabilityStatus: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  warrantyInformation: string;
  weight: number;
  shippingInformation: string;
  sku: string;
  returnPolicy: string;
  reviews: {
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  rating: number;
  id: number;
  title: string;
  description: string;
  price: number;
  quantity?: number;
}
// Product Slice
export const fetchProducts = () => { }

const initialState: {
  items: Product[];
  isLoading: boolean;
  currentPage: number;
} = {
  items: [],
  isLoading: false,
  currentPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
    },
  },
  extraReducers: (builder) => {

  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;