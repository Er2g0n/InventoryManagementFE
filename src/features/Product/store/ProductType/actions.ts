import { ProductType } from "@/types/MasterData/Product/ProductClassification";
import { DeleteProductTypeFailure, DeleteProductTypeSuccess, FetchProductTypesFailure, FetchProductTypesRequest, FetchProductTypesSuccess, ProductTypeAction, ProductTypeActionTypes, SaveProductTypeFailure, SaveProductTypeRequest, SaveProductTypeSuccess } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { deleteProductType, getAllProductType, saveProductType } from "@features/Product/Services/ProductTypeService";

export const fetchProductTypesRequest = (): FetchProductTypesRequest => ({
  type: ProductTypeActionTypes.FETCH_PRODUCT_TYPES_REQUEST,
});
export const fetchProductTypesSuccess = (
  productTypes: ProductType[]
): FetchProductTypesSuccess => ({
  type: ProductTypeActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
  payload: productTypes,
});

export const fetchProductTypesFailure = (error: string): FetchProductTypesFailure => ({
  type: ProductTypeActionTypes.FETCH_PRODUCT_TYPES_FAILURE,
  payload: error,
});

export const saveProductTypeRequest = (): SaveProductTypeRequest => ({
  type: ProductTypeActionTypes.SAVE_PRODUCT_TYPE_REQUEST,
});

export const saveProductTypeSuccess = (
  productType: ProductType
): SaveProductTypeSuccess => ({
  type: ProductTypeActionTypes.SAVE_PRODUCT_TYPE_SUCCESS,
  payload: productType,
});
export const saveProductTypeFailure = (error: string): SaveProductTypeFailure => ({
  type: ProductTypeActionTypes.SAVE_PRODUCT_TYPE_FAILURE,
  payload: error,
});

export const deleteProductTypeSuccess = (typeCode: string): DeleteProductTypeSuccess => ({
  type: ProductTypeActionTypes.DELETE_PRODUCT_TYPE_SUCCESS,
  payload: typeCode,
});

export const deleteProductTypeFailure = (error: string): DeleteProductTypeFailure => ({
  type: ProductTypeActionTypes.DELETE_PRODUCT_TYPE_FAILURE,
  payload: error,
});

export const fetchProductTypes = (): ThunkAction<
  void,
  RootState,
  unknown,
  ProductTypeAction
> => async (dispatch) => {
  dispatch(fetchProductTypesRequest());
  try {
    const response = await getAllProductType();
    if (response.code === "0" && response.data) {
      dispatch(fetchProductTypesSuccess(response.data));
    } else {
      dispatch(fetchProductTypesFailure(response.message || "Failed to fetch product types."));
    }

  } catch (error) {
    dispatch(fetchProductTypesFailure(error instanceof Error ? error.message : "An error occurred while fetching product types."));
  }
}

export const addOrUpdateProductType = (
  productType: ProductType
): ThunkAction<
  void,
  RootState,
  unknown,
  ProductTypeAction
> => async (dispatch) => {
  dispatch(saveProductTypeRequest());
  try {
    const response = await saveProductType(productType);
    if (response.code === "0" && response.data) {
      dispatch(saveProductTypeSuccess(response.data));
    } else {
      dispatch(saveProductTypeFailure(response.message || "Failed to save product type."));
    }
  } catch (error) {
    dispatch(saveProductTypeFailure(error instanceof Error ? error.message : "An error occurred while saving product type."));
  }
}


export const removeProductType = (
productTypeCode: string
): ThunkAction<
  void,
  RootState,
  unknown,
  ProductTypeAction
> => async (dispatch) => {
  try {
    const response = await deleteProductType(productTypeCode);
    if (response.code === "0") {
      dispatch(deleteProductTypeSuccess(productTypeCode));
    } else {
      dispatch(deleteProductTypeFailure(response.message || "Failed to delete product type."));
    }
  } catch (error) {
    dispatch(deleteProductTypeFailure(error instanceof Error ? error.message : "An error occurred while deleting product type."));
  }
}