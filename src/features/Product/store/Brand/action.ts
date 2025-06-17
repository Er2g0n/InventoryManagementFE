import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { BrandAction, BrandActionTypes, DeleteBrandFailure, DeleteBrandSuccess, FetchBrandsFailure, FetchBrandsRequest, FetchBrandsSuccess, SaveBrandFailure, SaveBrandRequest, SaveBrandSuccess } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { deleteBrand, getAllBrands, saveBrand } from "@features/Product/Services/ProductBrandService";
import { ResultService } from "@/types/Base/ResultService";

export const fetchBrandsRequest = (): FetchBrandsRequest => ({
  type: BrandActionTypes.FETCH_BRANDS_REQUEST
});

export const fetchBrandsSuccess = (
  brands: Brand[]
): FetchBrandsSuccess => ({
  type: BrandActionTypes.FETCH_BRANDS_SUCCESS,
  payload: brands
});

export const fetchBrandsFailure = (
  error: string
): FetchBrandsFailure => ({
  type: BrandActionTypes.FETCH_BRANDS_FAILURE,
  payload: error
});

export const saveBrandRequest = (): SaveBrandRequest => ({
  type: BrandActionTypes.SAVE_BRAND_REQUEST
});

export const saveBrandSuccess = (
  response: ResultService<Brand>
): SaveBrandSuccess => ({
  type: BrandActionTypes.SAVE_BRAND_SUCCESS,
  payload: response
});

export const saveBrandFailure = (
  error: string
): SaveBrandFailure => ({
  type: BrandActionTypes.SAVE_BRAND_FAILURE,
  payload: error
});

export const deleteBrandSuccess = (brandCode: string): DeleteBrandSuccess => ({
  type: BrandActionTypes.DELETE_BRAND_SUCCESS,
  payload: brandCode
});

export const deleteBrandFailure = (
  error: string
): DeleteBrandFailure => ({
  type: BrandActionTypes.DELETE_BRAND_FAILURE,
  payload: error
});

export const fetchBrands = (): ThunkAction<
  Promise<BrandAction>,
  RootState,
  unknown,
  BrandAction
> => async (dispatch) => {
  dispatch(fetchBrandsRequest());
  try {
    const response = await getAllBrands();

    if (response.code === "0" && response.data) {
      const successAction = fetchBrandsSuccess(response.data);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = fetchBrandsFailure(response.message || "Failed to fetch brands");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = fetchBrandsFailure(error instanceof Error ? error.message : "Failed to fetch brands");

    dispatch(failureAction);
    return failureAction;
  }
};

export const addOrUpdateBrand = (
  brand: Brand
): ThunkAction<Promise<BrandAction>, RootState, unknown, BrandAction> => async (dispatch) => {
  dispatch(saveBrandRequest());
  try {
    const response = await saveBrand(brand);

    if (response.code === "0") {
      const successAction = saveBrandSuccess(response);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = saveBrandFailure(response.message || "Failed to save brand");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = saveBrandFailure(error instanceof Error ? error.message : "Failed to save brand");

    dispatch(failureAction);
    return failureAction;
  }
};

export const removeBrand = (
  brandCode: string
): ThunkAction<Promise<BrandAction>, RootState, unknown, BrandAction> => async (dispatch) => {
  try {
    const response = await deleteBrand(brandCode);

    if (response.code === "0") {
      const successAction = deleteBrandSuccess(brandCode);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = deleteBrandFailure(response.message || "Failed to delete brand");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {

    const failureAction = deleteBrandFailure(
      error instanceof Error ? error.message : "Failed to delete brand"

    );

    dispatch(failureAction);
    return failureAction;
  }
};