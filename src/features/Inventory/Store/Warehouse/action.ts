import {
  WarehouseAction,
  WarehouseActionTypes,
  DeleteWarehouseFailure,
  DeleteWarehouseSuccess,
  FetchWarehousesFailure,
  FetchWarehousesRequest,
  FetchWarehousesSuccess,
  SaveWarehouseFailure,
  SaveWarehouseRequest,
  SaveWarehouseSuccess
} from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { ResultService } from "@/types/Base/ResultService";
import { Warehouse } from "@/types/WarehouseManagement/Warehouse";
import { deleteWarehouse, getAllWarehouses, saveWarehouse } from "@features/Inventory/Services/WarehouseService";

export const fetchWarehousesRequest = (): FetchWarehousesRequest => ({
  type: WarehouseActionTypes.FETCH_WAREHOUSES_REQUEST
});

export const fetchWarehousesSuccess = (
  warehouses: Warehouse[]
): FetchWarehousesSuccess => ({
  type: WarehouseActionTypes.FETCH_WAREHOUSES_SUCCESS,
  payload: warehouses
});

export const fetchWarehousesFailure = (
  error: string
): FetchWarehousesFailure => ({
  type: WarehouseActionTypes.FETCH_WAREHOUSES_FAILURE,
  payload: error
});

export const saveWarehouseRequest = (): SaveWarehouseRequest => ({
  type: WarehouseActionTypes.SAVE_WAREHOUSE_REQUEST
});

export const saveWarehouseSuccess = (
  response: ResultService<Warehouse>
): SaveWarehouseSuccess => ({
  type: WarehouseActionTypes.SAVE_WAREHOUSE_SUCCESS,
  payload: response
});

export const saveWarehouseFailure = (
  error: string
): SaveWarehouseFailure => ({
  type: WarehouseActionTypes.SAVE_WAREHOUSE_FAILURE,
  payload: error
});

export const deleteWarehouseSuccess = (warehouseCode: string): DeleteWarehouseSuccess => ({
  type: WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESS,
  payload: warehouseCode
});

export const deleteWarehouseFailure = (
  error: string
): DeleteWarehouseFailure => ({
  type: WarehouseActionTypes.DELETE_WAREHOUSE_FAILURE,
  payload: error
});

export const fetchWarehouses = (): ThunkAction<
  Promise<WarehouseAction>,
  RootState,
  unknown,
  WarehouseAction
> => async (dispatch) => {
  dispatch(fetchWarehousesRequest());
  try {
    const response = await getAllWarehouses();

    if (response.code === "0" && response.data) {
      const successAction = fetchWarehousesSuccess(response.data);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = fetchWarehousesFailure(response.message || "Failed to fetch warehouses");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = fetchWarehousesFailure(error instanceof Error ? error.message : "Failed to fetch warehouses");

    dispatch(failureAction);
    return failureAction;
  }
};

export const addOrUpdateWarehouse = (
  warehouse: Warehouse
): ThunkAction<Promise<WarehouseAction>, RootState, unknown, WarehouseAction> => async (dispatch) => {
  dispatch(saveWarehouseRequest());
  try {
    const response = await saveWarehouse(warehouse);

    if (response.code === "0") {
      const successAction = saveWarehouseSuccess(response);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = saveWarehouseFailure(response.message || "Failed to save warehouse");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = saveWarehouseFailure(error instanceof Error ? error.message : "Failed to save warehouse");

    dispatch(failureAction);
    return failureAction;
  }
};

export const removeWarehouse = (
  warehouseCode: string
): ThunkAction<Promise<WarehouseAction>, RootState, unknown, WarehouseAction> => async (dispatch) => {
  try {
    const response = await deleteWarehouse(warehouseCode);

    if (response.code === "0") {
      const successAction = deleteWarehouseSuccess(warehouseCode);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = deleteWarehouseFailure(response.message || "Failed to delete warehouse");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = deleteWarehouseFailure(
      error instanceof Error ? error.message : "Failed to delete warehouse"
    );

    dispatch(failureAction);
    return failureAction;
  }
};