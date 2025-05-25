import { productSlice } from '@features/Product';
import productCategorySlice from "@features/Product/store/ProductCategory";
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  product : productSlice,
  productCategory: productCategorySlice
})
export default rootReducer;
