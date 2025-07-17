import { ResultService } from "@/types/Base/ResultService";
import { UnitOfMeasure } from "@/types/MasterData/Product/ProductProperties";

export interface UoMState {
  uoMList: UnitOfMeasure[];
    loading: boolean;
    error: string | null;
}
export enum UoMActionTypes {
    FETCH_UOM_REQUEST = 'uom/FETCH_UOM_REQUEST',
    FETCH_UOM_SUCCESS = 'uom/FETCH_UOM_SUCCESS',
    FETCH_UOM_FAILURE = 'uom/FETCH_UOM_FAILURE',

    SAVE_UOM_REQUEST = 'uom/SAVE_UOM_REQUEST',
    SAVE_UOM_SUCCESS = 'uom/SAVE_UOM_SUCCESS',
    SAVE_UOM_FAILURE = 'uom/SAVE_UOM_FAILURE',

    DELETE_UOM_SUCCESS = 'uom/DELETE_UOM_SUCCESS',
    DELETE_UOM_FAILURE = 'uom/DELETE_UOM_FAILURE',
}
export interface FetchUoMRequest {
    type: typeof UoMActionTypes.FETCH_UOM_REQUEST;
}
export interface FetchUoMSuccess {
    type: typeof UoMActionTypes.FETCH_UOM_SUCCESS;
    payload: UnitOfMeasure[];
}
export interface FetchUoMFailure {
    type: typeof UoMActionTypes.FETCH_UOM_FAILURE;
    payload: string;
}

export interface SaveUoMRequest {
    type: typeof UoMActionTypes.SAVE_UOM_REQUEST;
}
export interface SaveUoMSuccess {
    type: typeof UoMActionTypes.SAVE_UOM_SUCCESS;
    payload: ResultService<UnitOfMeasure>;
}
export interface SaveUoMFailure {
    type: typeof UoMActionTypes.SAVE_UOM_FAILURE;
    payload: string;
}

export interface DeleteUoMSuccess {
    type: typeof UoMActionTypes.DELETE_UOM_SUCCESS;
    payload: string;
}
export interface DeleteUoMFailure {
    type: typeof UoMActionTypes.DELETE_UOM_FAILURE;
    payload: string;
}

export type UoMAction =
    | FetchUoMRequest
    | FetchUoMSuccess
    | FetchUoMFailure
    | SaveUoMRequest
    | SaveUoMSuccess
    | SaveUoMFailure
    | DeleteUoMSuccess
    | DeleteUoMFailure;