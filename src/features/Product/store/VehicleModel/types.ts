import { ResultService } from "@/types/Base/ResultService";
import { VehicleModel } from "@/types/MasterData/Product/ProductClassification";

export interface VehicleModelState {
    vehicleModels: VehicleModel[];
    loading: boolean;
    error: string | null;
}

export enum VehicleModelActionTypes {
    // Get all
    FETCH_VEHICLE_MODELS_REQUEST = "vehicleModel/FETCH_VEHICLE_MODELS_REQUEST",
    FETCH_VEHICLE_MODELS_SUCCESS = "vehicleModel/FETCH_VEHICLE_MODELS_SUCCESS",
    FETCH_VEHICLE_MODELS_FAILURE = "vehicleModel/FETCH_VEHICLE_MODELS_FAILURE",
    // Save or Update
    SAVE_VEHICLE_MODEL_REQUEST = "vehicleModel/SAVE_VEHICLE_MODEL_REQUEST",
    SAVE_VEHICLE_MODEL_SUCCESS = "vehicleModel/SAVE_VEHICLE_MODEL_SUCCESS",
    SAVE_VEHICLE_MODEL_FAILURE = "vehicleModel/SAVE_VEHICLE_MODEL_FAILURE",
    // Delete
    DELETE_VEHICLE_MODEL_SUCCESS = "vehicleModel/DELETE_VEHICLE_MODEL_SUCCESS",
    DELETE_VEHICLE_MODEL_FAILURE = "vehicleModel/DELETE_VEHICLE_MODEL_FAILURE"
}

export interface FetchVehicleModelsRequest {
    type: typeof VehicleModelActionTypes.FETCH_VEHICLE_MODELS_REQUEST;
}

export interface FetchVehicleModelsSuccess {
    type: typeof VehicleModelActionTypes.FETCH_VEHICLE_MODELS_SUCCESS;
    payload: VehicleModel[];
}

export interface FetchVehicleModelsFailure {
    type: typeof VehicleModelActionTypes.FETCH_VEHICLE_MODELS_FAILURE;
    payload: string;
}

export interface SaveVehicleModelRequest {
    type: typeof VehicleModelActionTypes.SAVE_VEHICLE_MODEL_REQUEST;
}

export interface SaveVehicleModelSuccess {
    type: typeof VehicleModelActionTypes.SAVE_VEHICLE_MODEL_SUCCESS;
    payload: ResultService<VehicleModel>;
}

export interface SaveVehicleModelFailure {
    type: typeof VehicleModelActionTypes.SAVE_VEHICLE_MODEL_FAILURE;
    payload: string;
}

export interface DeleteVehicleModelSuccess {
    type: typeof VehicleModelActionTypes.DELETE_VEHICLE_MODEL_SUCCESS;
    payload: string; // ModelCode
}

export interface DeleteVehicleModelFailure {
    type: typeof VehicleModelActionTypes.DELETE_VEHICLE_MODEL_FAILURE;
    payload: string;
}

export type VehicleModelAction =
    | FetchVehicleModelsRequest
    | FetchVehicleModelsSuccess
    | FetchVehicleModelsFailure
    | SaveVehicleModelRequest
    | SaveVehicleModelSuccess
    | SaveVehicleModelFailure
    | DeleteVehicleModelSuccess
    | DeleteVehicleModelFailure;