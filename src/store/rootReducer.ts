import { productSlice } from '@features/Product';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  product : productSlice
})
export default rootReducer;
