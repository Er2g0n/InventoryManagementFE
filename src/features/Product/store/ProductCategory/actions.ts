import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/store/store';
import {
  ProductCategoryActionTypes,
  FetchProductCategoriesRequest,
  FetchProductCategoriesSuccess,
  FetchProductCategoriesFailure,
  SaveProductCategoryRequest,
  SaveProductCategorySuccess,
  SaveProductCategoryFailure,
  DeleteProductCategorySuccess,
  ProductCategoryAction,
} from './types';
import { deleteProductCategory, getAllProductCategory, saveProductCategory } from '@features/Product/Services/ProductCategoryService';
import { ProductCategory } from '@/types/MasterData/Product/ProductClassification';

export const fetchProductCategoriesRequest = (): FetchProductCategoriesRequest => ({
  type: ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_REQUEST,
});

export const fetchProductCategoriesSuccess = (
  productCategories: ProductCategory[]
): FetchProductCategoriesSuccess => ({
  type: ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS,
  payload: productCategories,
});

export const fetchProductCategoriesFailure = (
  error: string
): FetchProductCategoriesFailure => ({
  type: ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_FAILURE,
  payload: error,
});

export const saveProductCategoryRequest = (): SaveProductCategoryRequest => ({
  type: ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_REQUEST,
});

export const saveProductCategorySuccess = (
  productCategory: ProductCategory
): SaveProductCategorySuccess => ({
  type: ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_SUCCESS,
  payload: productCategory,
});

export const saveProductCategoryFailure = (
  error: string
): SaveProductCategoryFailure => ({
  type: ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_FAILURE,
  payload: error,
});

export const deleteProductCategorySuccess = (
  categoryCode: string
): DeleteProductCategorySuccess => ({
  type: ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS,
  payload: categoryCode,
});
export const deleteProductCategoryFailure = (
  error: string
): ProductCategoryAction => ({
  type: ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_FAILURE,
  payload: error,
});

export const fetchProductCategories = (): ThunkAction<
  void,
  RootState,
  unknown,
  ProductCategoryAction
> => async (dispatch) => {
  dispatch(fetchProductCategoriesRequest());
  try {
    const response = await getAllProductCategory();
    if (response.code === "0") {
      dispatch(fetchProductCategoriesSuccess(response.data!));
    } else {
      dispatch(fetchProductCategoriesFailure(response.message || 'Failed to fetch Data'));
    }
  } catch (error) {
    dispatch(fetchProductCategoriesFailure(error instanceof Error ? error.message : 'Failed to fetch'));
  }
};

export const addOrUpdateProductCategory = (
  productCategory: ProductCategory
): ThunkAction<void, RootState, unknown, ProductCategoryAction> => async (dispatch) => {
  dispatch(saveProductCategoryRequest());
  try {
    const response = await saveProductCategory(productCategory);
    if (response.code === "0") {
      dispatch(saveProductCategorySuccess(productCategory));
    } else {
      dispatch(saveProductCategoryFailure(response.message || 'Failed to save'));
    }
  } catch (error) {
    dispatch(saveProductCategoryFailure(error instanceof Error ? error.message : 'Failed to save'));
  }
};

export const removeProductCategory = (
  categoryCode: string
): ThunkAction<void, RootState, unknown, ProductCategoryAction> => async (dispatch) => {
  try {
    const response = await deleteProductCategory(categoryCode);
    if (response.code === "0") {
      dispatch(deleteProductCategorySuccess(categoryCode));
    } else {
      dispatch(deleteProductCategoryFailure(response.message || 'Failed to delete'));
    }
  } catch (error) {
    dispatch(deleteProductCategoryFailure(error instanceof Error ? error.message : 'Failed to delete'));
  }
};