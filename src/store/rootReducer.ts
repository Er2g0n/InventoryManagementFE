import { productSlice, productTypeSlice, productCategorySlice } from '@features/Product';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  product : productSlice,
  productCategory: productCategorySlice,
  productType: productTypeSlice,
})
export default rootReducer;
