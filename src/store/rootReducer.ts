import { GoodsReceiptNoteSlice } from "@features/Inventory";
import { ProductSlice, productTypeSlice, productCategorySlice, colorSlice, TransactionTypeSlice, MaterialSlice, brandSlice, vehicleModelSlice, UoMSlice, productUoMConversionSlice } from "@features/Product";
import { warehouseSlice } from "@features/WarehouseManagement";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // Product domain
  product: ProductSlice,
  productCategory: productCategorySlice,
  productType: productTypeSlice,
  color: colorSlice,
  transactionType: TransactionTypeSlice,
  material: MaterialSlice,

  brand: brandSlice,
  vehicleModel: vehicleModelSlice,

  uom: UoMSlice,
  productUoMConversion: productUoMConversionSlice,
  // Inventory domain
  goodsReceiptNotes: GoodsReceiptNoteSlice,
  
  // Warehouse Management domain
  warehouse: warehouseSlice


});

export default rootReducer;
