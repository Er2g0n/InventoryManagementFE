import { ResultService } from "@/types/Base/ResultService";
import { ProductParam } from "@/types/MasterData/Product/ProductManagement";

export interface ProductState{
    products: ProductParam[];
    product: ProductParam | null;
    loading: boolean;
    error: string | null;
}

export enum ProductActionTypes {
    FETCH_PRODUCTS_REQUEST = 'product/FETCH_PRODUCTS_REQUEST',
    FETCH_PRODUCTS_SUCCESS = 'product/FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_FAILURE = 'product/FETCH_PRODUCTS_FAILURE',
    SAVE_PRODUCT_REQUEST = 'product/SAVE_PRODUCT_REQUEST',
    SAVE_PRODUCT_SUCCESS = 'product/SAVE_PRODUCT_SUCCESS',
    SAVE_PRODUCT_FAILURE = 'product/SAVE_PRODUCT_FAILURE',
    GET_PRODUCT_BY_CODE_REQUEST = 'product/GET_PRODUCT_BY_CODE_REQUEST',
    GET_PRODUCT_BY_CODE_SUCCESS = 'product/GET_PRODUCT_BY_CODE_SUCCESS',
    GET_PRODUCT_BY_CODE_FAILURE = 'product/GET_PRODUCT_BY_CODE_FAILURE',
    DELETE_PRODUCT_SUCCESS = 'product/DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAILURE = 'product/DELETE_PRODUCT_FAILURE',
}

export interface FetchProductsRequest {
    type: typeof ProductActionTypes.FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsSuccess {
    type: typeof ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
    payload: ProductParam[];
}

export interface FetchProductsFailure {
    type: typeof ProductActionTypes.FETCH_PRODUCTS_FAILURE;
    payload: string;
}

export interface SaveProductRequest {
    type: typeof ProductActionTypes.SAVE_PRODUCT_REQUEST;
}

export interface SaveProductSuccess {
    type: typeof ProductActionTypes.SAVE_PRODUCT_SUCCESS;
    payload: ResultService<ProductParam>;
}

export interface SaveProductFailure {
    type: typeof ProductActionTypes.SAVE_PRODUCT_FAILURE;
    payload: string;
}

export interface GetProductByCodeRequest {
    type: typeof ProductActionTypes.GET_PRODUCT_BY_CODE_REQUEST;
}
export interface GetProductByCodeSuccess {
    type: typeof ProductActionTypes.GET_PRODUCT_BY_CODE_SUCCESS;
    payload: ResultService<ProductParam>;
}
export interface GetProductByCodeFailure {
    type: typeof ProductActionTypes.GET_PRODUCT_BY_CODE_FAILURE;
    payload: string;
}
export interface DeleteProductSuccess {
    type: typeof ProductActionTypes.DELETE_PRODUCT_SUCCESS;
    payload: string; // productCode
}
export interface DeleteProductFailure {
    type: typeof ProductActionTypes.DELETE_PRODUCT_FAILURE;
    payload: string;
}
export type ProductAction =
    | FetchProductsRequest
    | FetchProductsSuccess
    | FetchProductsFailure
    | SaveProductRequest
    | SaveProductSuccess
    | SaveProductFailure
    | GetProductByCodeRequest
    | GetProductByCodeSuccess
    | GetProductByCodeFailure
    | DeleteProductSuccess
    | DeleteProductFailure;