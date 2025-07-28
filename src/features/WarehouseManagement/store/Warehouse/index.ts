import { createSlice } from "@reduxjs/toolkit";
import { WarehouseState, WarehouseActionTypes, FetchWarehousesSuccess, FetchWarehousesFailure, SaveWarehouseSuccess, SaveWarehouseFailure, DeleteWarehouseSuccess, DeleteWarehouseFailure } from "./types";

const initialState: WarehouseState = {
  warehouses: [],
  loading: false,
  error: null
};

const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch warehouses
      .addCase(WarehouseActionTypes.FETCH_WAREHOUSES_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WarehouseActionTypes.FETCH_WAREHOUSES_SUCCESS, (state, action: FetchWarehousesSuccess) => {
        state.loading = false;
        state.warehouses = action.payload;
      })
      .addCase(WarehouseActionTypes.FETCH_WAREHOUSES_FAILURE, (state, action: FetchWarehousesFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save warehouse
      .addCase(WarehouseActionTypes.SAVE_WAREHOUSE_REQUEST, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(WarehouseActionTypes.SAVE_WAREHOUSE_SUCCESS, (state, action: SaveWarehouseSuccess) => {
        state.loading = false;
        const index = state.warehouses.findIndex(
          (wh) => wh.warehouseCode === action.payload.data!.warehouseCode
        );

        if (index !== -1) {
          state.warehouses[index] = action.payload.data!;
        } else {
          state.warehouses.push(action.payload.data!);
        }
      })
      .addCase(WarehouseActionTypes.SAVE_WAREHOUSE_FAILURE, (state, action: SaveWarehouseFailure) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete warehouse
      .addCase(WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESS, (state, action: DeleteWarehouseSuccess) => {
        state.warehouses = state.warehouses.filter(
          (wh) => wh.warehouseCode !== action.payload
        );
      })
      .addCase(WarehouseActionTypes.DELETE_WAREHOUSE_FAILURE, (state, action: DeleteWarehouseFailure) => {
        state.error = action.payload;
      });
  }
});

export default warehouseSlice.reducer;