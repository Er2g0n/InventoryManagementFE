import { productSlice, productTypeSlice, productCategorySlice, colorSlice, TransactionTypeSlice } from '@features/Product';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  product: productSlice,
  productCategory: productCategorySlice,
  productType: productTypeSlice,
  color: colorSlice,
  transactionType: TransactionTypeSlice
})
export default rootReducer;
