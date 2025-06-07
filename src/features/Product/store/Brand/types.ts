import { Brand } from "@/types/MasterData/Product/ProductClassification";

export interface BrandState {
    brands: Brand[];
    loading: boolean;
    error: string | null;
}
export enum BrandActionTypes {
    // Get all
    FETCH_BRANDS_REQUEST = 'brand/FETCH_BRANDS_REQUEST',
    FETCH_BRANDS_SUCCESS = 'brand/FETCH_BRANDS_SUCCESS',
    FETCH_BRANDS_FAILURE = 'brand/FETCH_BRANDS_FAILURE',
    // Save or Update
    SAVE_BRAND_REQUEST = 'brand/SAVE_BRAND_REQUEST',
    SAVE_BRAND_SUCCESS = 'brand/SAVE_BRAND_SUCCESS',
    SAVE_BRAND_FAILURE = 'brand/SAVE_BRAND_FAILURE',
    // Delete
    DELETE_BRAND_SUCCESS = 'brand/DELETE_BRAND_SUCCESS',
    DELETE_BRAND_FAILURE = 'brand/DELETE_BRAND_FAILURE'
}

export interface FetchBrandsRequest {
    type: typeof BrandActionTypes.FETCH_BRANDS_REQUEST;
}

export interface FetchBrandsSuccess {
    type: typeof BrandActionTypes.FETCH_BRANDS_SUCCESS;
    payload: Brand[];
}
export interface FetchBrandsFailure {
    type: typeof BrandActionTypes.FETCH_BRANDS_FAILURE;
    payload: string;
}
export interface SaveBrandRequest {
    type: typeof BrandActionTypes.SAVE_BRAND_REQUEST;
}
export interface SaveBrandSuccess {
    type: typeof BrandActionTypes.SAVE_BRAND_SUCCESS;
    payload: Brand;
}
export interface SaveBrandFailure {
    type: typeof BrandActionTypes.SAVE_BRAND_FAILURE;
    payload: string;
}
export interface DeleteBrandSuccess {
    type: typeof BrandActionTypes.DELETE_BRAND_SUCCESS;
    payload: string;
}
export interface DeleteBrandFailure {
    type: typeof BrandActionTypes.DELETE_BRAND_FAILURE;
    payload: string;
}

export type BrandAction =
    | FetchBrandsRequest
    | FetchBrandsSuccess
    | FetchBrandsFailure
    | SaveBrandRequest
    | SaveBrandSuccess
    | SaveBrandFailure
    | DeleteBrandSuccess
    | DeleteBrandFailure;