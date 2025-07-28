import { ResultService } from "@/types/Base/ResultService";
import { Warehouse } from "@/types/WarehouseManagement/Warehouse";

export interface WarehouseState {
    warehouses: Warehouse[];
    loading: boolean;
    error: string | null;
}

export enum WarehouseActionTypes {
    // Get all
    FETCH_WAREHOUSES_REQUEST = "warehouse/FETCH_WAREHOUSES_REQUEST",
    FETCH_WAREHOUSES_SUCCESS = "warehouse/FETCH_WAREHOUSES_SUCCESS",
    FETCH_WAREHOUSES_FAILURE = "warehouse/FETCH_WAREHOUSES_FAILURE",
    // Save or Update
    SAVE_WAREHOUSE_REQUEST = "warehouse/SAVE_WAREHOUSE_REQUEST",
    SAVE_WAREHOUSE_SUCCESS = "warehouse/SAVE_WAREHOUSE_SUCCESS",
    SAVE_WAREHOUSE_FAILURE = "warehouse/SAVE_WAREHOUSE_FAILURE",
    // Delete
    DELETE_WAREHOUSE_SUCCESS = "warehouse/DELETE_WAREHOUSE_SUCCESS",
    DELETE_WAREHOUSE_FAILURE = "warehouse/DELETE_WAREHOUSE_FAILURE"
}

export interface FetchWarehousesRequest {
    type: typeof WarehouseActionTypes.FETCH_WAREHOUSES_REQUEST;
}

export interface FetchWarehousesSuccess {
    type: typeof WarehouseActionTypes.FETCH_WAREHOUSES_SUCCESS;
    payload: Warehouse[];
}

export interface FetchWarehousesFailure {
    type: typeof WarehouseActionTypes.FETCH_WAREHOUSES_FAILURE;
    payload: string;
}

export interface SaveWarehouseRequest {
    type: typeof WarehouseActionTypes.SAVE_WAREHOUSE_REQUEST;
}

export interface SaveWarehouseSuccess {
    type: typeof WarehouseActionTypes.SAVE_WAREHOUSE_SUCCESS;
    payload: ResultService<Warehouse>;
}

export interface SaveWarehouseFailure {
    type: typeof WarehouseActionTypes.SAVE_WAREHOUSE_FAILURE;
    payload: string;
}

export interface DeleteWarehouseSuccess {
    type: typeof WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESS;
    payload: string; // WarehouseCode
}

export interface DeleteWarehouseFailure {
    type: typeof WarehouseActionTypes.DELETE_WAREHOUSE_FAILURE;
    payload: string;
}

export type WarehouseAction =
    | FetchWarehousesRequest
    | FetchWarehousesSuccess
    | FetchWarehousesFailure
    | SaveWarehouseRequest
    | SaveWarehouseSuccess
    | SaveWarehouseFailure
    | DeleteWarehouseSuccess
    | DeleteWarehouseFailure;