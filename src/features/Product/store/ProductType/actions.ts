import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/store/store';
import {
  ProductTypeActionTypes,
  FetchProductTypesRequest,
  FetchProductTypesSuccess,
  FetchProductTypesFailure,
  SaveProductTypeRequest,
  SaveProductTypeSuccess,
  SaveProductTypeFailure,
  DeleteProductTypeSuccess,
  DeleteProductTypeFailure,
  ProductTypeAction
} from './types';

import {
  getAllProductType,
  saveProductType,
  deleteProductType
} from '@features/Product/Services/ProductTypeService';

import { ProductType } from '@/types/MasterData/Product/ProductClassification';
import { ResultService } from '@/types/Base/ResultService';

export const fetchProductTypesRequest = (): FetchProductTypesRequest => ({
  type: ProductTypeActionTypes.FETCH_PRODUCT_TYPES_REQUEST,
});

export const fetchProductTypesSuccess = (
  productTypes: ProductType[]
): FetchProductTypesSuccess => ({
  type: ProductTypeActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
  payload: productTypes,
});

export const fetchProductTypesFailure = (
  error: string
): FetchProductTypesFailure => ({
  type: ProductTypeActionTypes.FETCH_PRODUCT_TYPES_FAILURE,
  payload: error,
});

export const saveProductTypeRequest = (): SaveProductTypeRequest => ({
  type: ProductTypeActionTypes.SAVE_PRODUCT_TYPE_REQUEST,
});

export const saveProductTypeSuccess = (
  response: ResultService<ProductType>
): SaveProductTypeSuccess => ({
  type: ProductTypeActionTypes.SAVE_PRODUCT_TYPE_SUCCESS,
  payload: response,
});

export const saveProductTypeFailure = (
  error: string
): SaveProductTypeFailure => ({
  type: ProductTypeActionTypes.SAVE_PRODUCT_TYPE_FAILURE,
  payload: error,
});

export const deleteProductTypeSuccess = (
  typeCode: string
): DeleteProductTypeSuccess => ({
  type: ProductTypeActionTypes.DELETE_PRODUCT_TYPE_SUCCESS,
  payload: typeCode,
});

export const deleteProductTypeFailure = (
  error: string
): DeleteProductTypeFailure => ({
  type: ProductTypeActionTypes.DELETE_PRODUCT_TYPE_FAILURE,
  payload: error,
});

export const fetchProductTypes = (): ThunkAction<
  Promise<ProductTypeAction>,
  RootState,
  unknown,
  ProductTypeAction
> => async (dispatch) => {
  dispatch(fetchProductTypesRequest());
  try {
    const response = await getAllProductType();
    if (response.code === "0" && response.data) {
      const successAction = fetchProductTypesSuccess(response.data);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = fetchProductTypesFailure(response.message || 'Failed to fetch product types');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = fetchProductTypesFailure(
      error instanceof Error ? error.message : 'Failed to fetch product types'
    );
    dispatch(failureAction);
    return failureAction;
  }
};

export const addOrUpdateProductType = (
  productType: ProductType
): ThunkAction<Promise<ProductTypeAction>, RootState, unknown, ProductTypeAction> => async (dispatch) => {
  dispatch(saveProductTypeRequest());
  try {
    const response = await saveProductType(productType);
    if (response.code === "0") {
      const successAction = saveProductTypeSuccess(response);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = saveProductTypeFailure(response.message || 'Failed to save product type');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = saveProductTypeFailure(
      error instanceof Error ? error.message : 'Failed to save product type'
    );
    dispatch(failureAction);
    return failureAction;
  }
};

export const removeProductType = (
  typeCode: string
): ThunkAction<Promise<ProductTypeAction>, RootState, unknown, ProductTypeAction> => async (dispatch) => {
  try {
    const response = await deleteProductType(typeCode);
    if (response.code === "0") {
      const successAction = deleteProductTypeSuccess(typeCode);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = deleteProductTypeFailure(response.message || 'Failed to delete product type');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = deleteProductTypeFailure(
      error instanceof Error ? error.message : 'Failed to delete product type'
    );
    dispatch(failureAction);
    return failureAction;
  }
};
