import { productSlice, productTypeSlice, productCategorySlice, colorSlice } from '@features/Product';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  product : productSlice,
  productCategory: productCategorySlice,
  productType: productTypeSlice,
  color: colorSlice
})
export default rootReducer;
