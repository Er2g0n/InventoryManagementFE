import { createSlice } from '@reduxjs/toolkit';
import {
  ProductCategoryState,
  ProductCategoryActionTypes,
  FetchProductCategoriesSuccess,
  FetchProductCategoriesFailure,
  SaveProductCategorySuccess,
  SaveProductCategoryFailure,
  DeleteProductCategorySuccess,
  DeleteProductCategoryFailure,
} from './types'; // Import action creators directly

const initialState: ProductCategoryState = {
  productCategories: [],
  loading: false,
  error: null,
};

const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch product categories
      .addCase(ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS, (state, action: FetchProductCategoriesSuccess) => {
        state.loading = false;
        state.productCategories = action.payload;
      })
      .addCase(ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_FAILURE, (state, action: FetchProductCategoriesFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save product category
      .addCase(ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_SUCCESS, (state, action: SaveProductCategorySuccess) => {
        state.loading = false;
        const index = state.productCategories.findIndex(
          (pc) => pc.categoryCode === action.payload.data!.categoryCode
        );
        if (index !== -1) {
          state.productCategories[index] = action.payload.data!;
        } else {
          state.productCategories.push(action.payload.data!);
        }
      })
      .addCase(ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_FAILURE, (state, action:SaveProductCategoryFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete product category
      .addCase(ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS, (state, action: DeleteProductCategorySuccess) => {
        state.productCategories = state.productCategories.filter(
          (pc) => pc.categoryCode !== action.payload
        );
      })
      .addCase(ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_FAILURE, (state, action: DeleteProductCategoryFailure) => {
        state.error = action.payload;
      });
  },
});

export default productCategorySlice.reducer;