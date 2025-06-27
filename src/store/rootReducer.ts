import { warehouseSlice } from "@features/Inventory";
import { productSlice, productTypeSlice, productCategorySlice, colorSlice, TransactionTypeSlice, MaterialSlice, brandSlice, vehicleModelSlice } from "@features/Product";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // Product domain
  product: productSlice,
  productCategory: productCategorySlice,
  productType: productTypeSlice,
  color: colorSlice,
  transactionType: TransactionTypeSlice,
  material: MaterialSlice,
  brand: brandSlice,
  vehicleModel: vehicleModelSlice,

  // Inventory domain
  warehouse: warehouseSlice
});

export default rootReducer;
