import { productSlice, productTypeSlice, productCategorySlice, colorSlice,brandSlice } from '@features/Product';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  product : productSlice,
  productCategory: productCategorySlice,
  productType: productTypeSlice,
  color: colorSlice,
  brand: brandSlice,
})
export default rootReducer;
