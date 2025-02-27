import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
// export const fetchProducts = () => { }

export const fetchProducts = createAsyncThunk("products/fetchProducts",
  async (currentPage :number) => {
  const response = await fetch(`https://dummyjson.com/products/?limit=10&skip=${(currentPage - 1) * 10}`);
  const jsonAllProducts = await response.json();
  // console.log(jsonAllProducts);

  return jsonAllProducts.products;
});
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
      // console.log(action.payload)
        state.currentPage = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action)=>{
      state.items = action.payload;
      state.isLoading = false;
    })
  },
});

export const { setPage, setProducts } = productSlice.actions;
export default productSlice.reducer;