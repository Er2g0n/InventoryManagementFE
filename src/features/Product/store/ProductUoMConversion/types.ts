import { ResultService } from "@/types/Base/ResultService";
import { ProductUoMConversion } from "@/types/MasterData/Product/ProductManagement";

export interface ProductUoMConversionState {
    productUoMConversions: ProductUoMConversion[];
    loading: boolean;
    error: string | null;

}

export enum ProductUoMConversionActionTypes {
    FETCH_PRODUCT_UOM_CONVERSIONS_REQUEST = 'productUoMConversion/FETCH_PRODUCT_UOM_CONVERSIONS_REQUEST',
    FETCH_PRODUCT_UOM_CONVERSIONS_SUCCESS = 'productUoMConversion/FETCH_PRODUCT_UOM_CONVERSIONS_SUCCESS',
    FETCH_PRODUCT_UOM_CONVERSIONS_FAILURE = 'productUoMConversion/FETCH_PRODUCT_UOM_CONVERSIONS_FAILURE',

    SAVE_PRODUCT_UOM_CONVERSION_REQUEST = 'productUoMConversion/SAVE_PRODUCT_UOM_CONVERSION_REQUEST',
    SAVE_PRODUCT_UOM_CONVERSION_SUCCESS = 'productUoMConversion/SAVE_PRODUCT_UOM_CONVERSION_SUCCESS',
    SAVE_PRODUCT_UOM_CONVERSION_FAILURE = 'productUoMConversion/SAVE_PRODUCT_UOM_CONVERSION_FAILURE',

    GET_PRODUCT_UOM_CONVERSION_BY_CODE_REQUEST = 'productUoMConversion/GET_PRODUCT_UOM_CONVERSION_BY_CODE_REQUEST',
    GET_PRODUCT_UOM_CONVERSION_BY_CODE_SUCCESS = 'productUoMConversion/GET_PRODUCT_UOM_CONVERSION_BY_CODE_SUCCESS',
    GET_PRODUCT_UOM_CONVERSION_BY_CODE_FAILURE = 'productUoMConversion/GET_PRODUCT_UOM_CONVERSION_BY_CODE_FAILURE',

    DELETE_PRODUCT_UOM_CONVERSION_SUCCESS = 'productUoMConversion/DELETE_PRODUCT_UOM_CONVERSION_SUCCESS',
    DELETE_PRODUCT_UOM_CONVERSION_FAILURE = 'productUoMConversion/DELETE_PRODUCT_UOM_CONVERSION_FAILURE',
}

export interface FetchProductUoMConversionsRequest {
    type: typeof ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_REQUEST;
}
export interface FetchProductUoMConversionsSuccess {
    type: typeof ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_SUCCESS;
    payload: ProductUoMConversion[];
}
export interface FetchProductUoMConversionsFailure {
    type: typeof ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_FAILURE;
    payload: string;
}


export interface SaveProductUoMConversionRequest {
    type: typeof ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_REQUEST;
}
export interface SaveProductUoMConversionSuccess {
    type: typeof ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_SUCCESS;
    payload: ResultService<ProductUoMConversion>;
}
export interface SaveProductUoMConversionFailure {
    type: typeof ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_FAILURE;
    payload: string;
}


export interface GetProductUoMConversionByCodeRequest {
    type: typeof ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_REQUEST;
}
export interface GetProductUoMConversionByCodeSuccess {
    type: typeof ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_SUCCESS;
    payload: ResultService<ProductUoMConversion>;
}
export interface GetProductUoMConversionByCodeFailure {
    type: typeof ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_FAILURE;
    payload: string;
}



export interface DeleteProductUoMConversionSuccess {
    type: typeof ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_SUCCESS;
    payload: string;
}
export interface DeleteProductUoMConversionFailure {
    type: typeof ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_FAILURE;
    payload: string;
}


export type ProductUoMConversionAction =
    | FetchProductUoMConversionsRequest
    | FetchProductUoMConversionsSuccess
    | FetchProductUoMConversionsFailure
    | SaveProductUoMConversionRequest
    | SaveProductUoMConversionSuccess
    | SaveProductUoMConversionFailure
    | GetProductUoMConversionByCodeRequest
    | GetProductUoMConversionByCodeSuccess
    | GetProductUoMConversionByCodeFailure
    | DeleteProductUoMConversionSuccess
    | DeleteProductUoMConversionFailure;