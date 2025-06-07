import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { BrandAction, BrandActionTypes, FetchBrandsFailure, FetchBrandsRequest, FetchBrandsSuccess, SaveBrandRequest } from "./types"
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";

export const fetchBrandsRequest = (): FetchBrandsRequest => ({
    type: BrandActionTypes.FETCH_BRANDS_REQUEST,
});

export const fetchBrandsSuccess = (
    brands: Brand[]
): FetchBrandsSuccess => ({
    type: BrandActionTypes.FETCH_BRANDS_SUCCESS,
    payload: brands,
});

export const fetchBrandsFailure = (
    error: string
): FetchBrandsFailure => ({
    type: BrandActionTypes.FETCH_BRANDS_FAILURE,
    payload: error,
});
export const saveBrandRequest = ():SaveBrandRequest => ({
    type: BrandActionTypes.SAVE_BRAND_REQUEST,
});
export const saveBrandSuccess = (
    brand: Brand
) => ({
    type: BrandActionTypes.SAVE_BRAND_SUCCESS,
    payload: brand,
});
export const saveBrandFailure = (error: string) => ({
    type: BrandActionTypes.SAVE_BRAND_FAILURE,
    payload: error,
});
export const deleteBrandSuccess = (brandCode: string) => ({
    type: BrandActionTypes.DELETE_BRAND_SUCCESS,
    payload: brandCode,
});
export const deleteBrandFailure = (error: string) => ({
    type: BrandActionTypes.DELETE_BRAND_FAILURE,
    payload: error,
});

export const fetchBrands = (): ThunkAction<
    void, 
    RootState, 
    unknown, 
    BrandAction
    > => async (dispatch) => {
    dispatch(fetchBrandsRequest());
    }
