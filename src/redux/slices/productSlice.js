import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filters: {
    category: "",
    brand: "",
    price: null,
    rating: null,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { setProducts, setFilters } = productsSlice.actions;

export default productsSlice;
