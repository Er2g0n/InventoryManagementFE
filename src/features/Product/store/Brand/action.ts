import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { BrandAction, BrandActionTypes, DeleteBrandFailure, DeleteBrandSuccess, FetchBrandsFailure, FetchBrandsRequest, FetchBrandsSuccess, SaveBrandFailure, SaveBrandRequest, SaveBrandSuccess } from "./types"
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { deleteBrand, getAllBrands, saveBrand } from "@features/Product/Services/ProductBrandService";

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
): SaveBrandSuccess  => ({
    type: BrandActionTypes.SAVE_BRAND_SUCCESS,
    payload: brand,
});
export const saveBrandFailure = (error: string):SaveBrandFailure => ({
    type: BrandActionTypes.SAVE_BRAND_FAILURE,
    payload: error,
});
export const deleteBrandSuccess = (brandCode: string): DeleteBrandSuccess => ({
    type: BrandActionTypes.DELETE_BRAND_SUCCESS,
    payload: brandCode,
});
export const deleteBrandFailure = (error: string):DeleteBrandFailure => ({
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
  
    try{
        const response = await getAllBrands();
        if(response.code === "0" && response.data) {
            dispatch(fetchBrandsSuccess(response.data));
        }
        else {
            dispatch(fetchBrandsFailure(response.message || "Failed to fetch brands"));
        }
    }catch (error) {
        dispatch(fetchBrandsFailure(error instanceof Error ? error.message : "Failed to fetch brands"));
    }
};

export const addOrUpdateBrand = (
    brand: Brand
): ThunkAction<
    void, 
    RootState, 
    unknown, 
    BrandAction
    > => async (dispatch) => 
        {   
            dispatch(saveBrandRequest());
            try {
                const response = await saveBrand(brand);
                if (response.code === "0" && response.data) {
                    dispatch(saveBrandSuccess(response.data));
                } else {
                    dispatch(saveBrandFailure(response.message || "Failed to save brand"));
                }
            } catch (error) {
                dispatch(saveBrandFailure(error instanceof Error ? error.message : "Failed to save brand"));
            }
        }   

export const removeBrand = (
    brandCode: string
): ThunkAction<
    void, 
    RootState, 
    unknown, 
    BrandAction
    > => async (dispatch) => {
    try {
        // Assuming deleteBrand is implemented in the service
        const response = await deleteBrand(brandCode);
        if (response.code === "0") {
            dispatch(deleteBrandSuccess(brandCode));
        } else {
            dispatch(deleteBrandFailure(response.message || "Failed to delete brand"));
        }
    } catch (error) {
        dispatch(deleteBrandFailure(error instanceof Error ? error.message : "Failed to delete brand"));
    }
};