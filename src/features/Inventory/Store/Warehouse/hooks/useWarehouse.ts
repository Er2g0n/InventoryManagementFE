import { AppDispatch, RootState } from "@/store/store";
import { addOrUpdateWarehouse, fetchWarehouses, removeWarehouse } from "../action";
import { useDispatch, useSelector } from "react-redux";
import { WarehouseActionTypes } from "../types"; // Giả định đã có WarehouseActionTypes
import { Warehouse } from "@/types/WarehouseManagement/Warehouse";

export const useWarehouses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);
  const loading = useSelector((state: RootState) => state.warehouse.loading);
  const error = useSelector((state: RootState) => state.warehouse.error);

  const loadWarehouses = (): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(fetchWarehouses())
        .then((action) => {
          if (action.type === WarehouseActionTypes.FETCH_WAREHOUSES_SUCCESS) {
            resolve({ success: true });
          } else {
            resolve({
              success: false,
              message: "Failed to fetch warehouses."
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while fetching warehouses."
          });
        });
    });

  const saveWarehouse = (warehouse: Warehouse): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateWarehouse(warehouse))
        .then((action) => {
          if (action.type === WarehouseActionTypes.SAVE_WAREHOUSE_SUCCESS) {
            resolve({ success: true, message: action.payload.message });
          } else if (action.type === WarehouseActionTypes.SAVE_WAREHOUSE_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to save warehouse." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while saving warehouse."
          });
        });
    });

  const deleteWarehouse = (warehouseCode: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeWarehouse(warehouseCode))
        .then((action) => {
          if (action.type === WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESS) {
            resolve({ success: true, message: action.payload });
          } else if (action.type === WarehouseActionTypes.DELETE_WAREHOUSE_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to delete warehouse." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while deleting warehouse."
          });
        });
    });

  return {
    warehouses,
    loading,
    error,
    loadWarehouses,
    saveWarehouse,
    deleteWarehouse
  };
};