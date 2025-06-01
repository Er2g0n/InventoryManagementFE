import { ProductType } from "@/types/MasterData/Product/ProductClassification";

export interface ProductTypeState{
    productTypes: ProductType[];
    loading: boolean;
    error: string | null;
}

export enum ProductTypeActionTypes {
    FETCH_PRODUCT_TYPES_REQUEST = 'productType/FETCH_PRODUCT_TYPES_REQUEST',
    FETCH_PRODUCT_TYPES_SUCCESS = 'productType/FETCH_PRODUCT_TYPES_SUCCESS',
    FETCH_PRODUCT_TYPES_FAILURE = 'productType/FETCH_PRODUCT_TYPES_FAILURE',

    SAVE_PRODUCT_TYPE_REQUEST = 'productType/SAVE_PRODUCT_TYPE_REQUEST',
    SAVE_PRODUCT_TYPE_SUCCESS = 'productType/SAVE_PRODUCT_TYPE_SUCCESS',
    SAVE_PRODUCT_TYPE_FAILURE = 'productType/SAVE_PRODUCT_TYPE_FAILURE',

    DELETE_PRODUCT_TYPE_SUCCESS = 'productType/DELETE_PRODUCT_TYPE_SUCCESS',
    DELETE_PRODUCT_TYPE_FAILURE = 'productType/DELETE_PRODUCT_TYPE_FAILURE',
}

export interface FetchProductTypesRequest {
    type: typeof ProductTypeActionTypes.FETCH_PRODUCT_TYPES_REQUEST;
}
export interface FetchProductTypesSuccess {
    type: typeof ProductTypeActionTypes.FETCH_PRODUCT_TYPES_SUCCESS;
    payload: ProductType[];
}
export interface FetchProductTypesFailure {
    type: typeof ProductTypeActionTypes.FETCH_PRODUCT_TYPES_FAILURE;
    payload: string;
}


export interface SaveProductTypeRequest {
    type: typeof ProductTypeActionTypes.SAVE_PRODUCT_TYPE_REQUEST;
}
export interface SaveProductTypeSuccess {
    type: typeof ProductTypeActionTypes.SAVE_PRODUCT_TYPE_SUCCESS;
    payload: ProductType;
}
export interface SaveProductTypeFailure {
    type: typeof ProductTypeActionTypes.SAVE_PRODUCT_TYPE_FAILURE;
    payload: string;
}


export interface DeleteProductTypeSuccess {
    type: typeof ProductTypeActionTypes.DELETE_PRODUCT_TYPE_SUCCESS;
    payload: string;
}
export interface DeleteProductTypeFailure {
    type: typeof ProductTypeActionTypes.DELETE_PRODUCT_TYPE_FAILURE;
    payload: string;
}

export type ProductTypeAction =
    | FetchProductTypesRequest
    | FetchProductTypesSuccess
    | FetchProductTypesFailure
    | SaveProductTypeRequest
    | SaveProductTypeSuccess
    | SaveProductTypeFailure
    | DeleteProductTypeSuccess
    | DeleteProductTypeFailure;