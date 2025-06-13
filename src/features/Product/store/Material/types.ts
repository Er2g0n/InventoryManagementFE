import { ResultService } from "@/types/Base/ResultService";
import { Material } from "@/types/MasterData/Product/ProductProperties";


export interface MaterialState {
  materials: Material[];
  loading: boolean;
  error: string | null;
}

export enum MaterialActionTypes {
  // get all
  FETCH_MATERIALS_REQUEST = 'material/FETCH_MATERIALS_REQUEST',
  FETCH_MATERIALS_SUCCESS = 'material/FETCH_MATERIALS_SUCCESS',
  FETCH_MATERIALS_FAILURE = 'material/FETCH_MATERIALS_FAILURE',
  // save: create or update
  SAVE_MATERIAL_REQUEST = 'material/SAVE_MATERIAL_REQUEST',
  SAVE_MATERIAL_SUCCESS = 'material/SAVE_MATERIAL_SUCCESS',
  SAVE_MATERIAL_FAILURE = 'material/SAVE_MATERIAL_FAILURE',
  // delete
  DELETE_MATERIAL_SUCCESS = 'material/DELETE_MATERIAL_SUCCESS',
  DELETE_MATERIAL_FAILURE = 'material/DELETE_MATERIAL_FAILURE',
}

export interface FetchMaterialsRequest {
  type: typeof MaterialActionTypes.FETCH_MATERIALS_REQUEST;
}

export interface FetchMaterialsSuccess {
  type: typeof MaterialActionTypes.FETCH_MATERIALS_SUCCESS;
  payload: Material[];
}

export interface FetchMaterialsFailure {
  type: typeof MaterialActionTypes.FETCH_MATERIALS_FAILURE;
  payload: string;
}

export interface SaveMaterialRequest {
  type: typeof MaterialActionTypes.SAVE_MATERIAL_REQUEST;
}

export interface SaveMaterialSuccess {
  type: typeof MaterialActionTypes.SAVE_MATERIAL_SUCCESS;
  payload: ResultService<Material>;
}

export interface SaveMaterialFailure {
  type: typeof MaterialActionTypes.SAVE_MATERIAL_FAILURE;
  payload: string;
}

export interface DeleteMaterialSuccess {
  type: typeof MaterialActionTypes.DELETE_MATERIAL_SUCCESS;
  payload: string;
}

export interface DeleteMaterialFailure {
  type: typeof MaterialActionTypes.DELETE_MATERIAL_FAILURE;
  payload: string;
}

export type MaterialAction =
  | FetchMaterialsRequest
  | FetchMaterialsSuccess
  | FetchMaterialsFailure
  | SaveMaterialRequest
  | SaveMaterialSuccess
  | SaveMaterialFailure
  | DeleteMaterialSuccess
  | DeleteMaterialFailure;