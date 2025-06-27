import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedProduct: null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts (state, action) {
      state.products = action.payload;
    },
    selectProduct (state, action) {
      state.selectedProduct = action.payload;
    }
    // Thêm các reducer khác nếu cần
  }
});

export const { setProducts, selectProduct } = productSlice.actions;
export default productSlice.reducer;
