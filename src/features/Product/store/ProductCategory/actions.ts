import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import {
  ProductCategoryActionTypes,
  FetchProductCategoriesRequest,
  FetchProductCategoriesSuccess,
  FetchProductCategoriesFailure,
  SaveProductCategoryRequest,
  SaveProductCategorySuccess,
  SaveProductCategoryFailure,
  DeleteProductCategorySuccess,
  ProductCategoryAction
} from "./types";
import { deleteProductCategory, getAllProductCategory, saveProductCategory } from "@features/Product/Services/ProductCategoryService";
import { ProductCategory } from "@/types/MasterData/Product/ProductClassification";
import { ResultService } from "@/types/Base/ResultService";

export const fetchProductCategoriesRequest = (): FetchProductCategoriesRequest => ({
  type: ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_REQUEST
});

export const fetchProductCategoriesSuccess = (
  productCategories: ProductCategory[]
): FetchProductCategoriesSuccess => ({
  type: ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS,
  payload: productCategories
});

export const fetchProductCategoriesFailure = (
  error: string
): FetchProductCategoriesFailure => ({
  type: ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_FAILURE,
  payload: error
});

export const saveProductCategoryRequest = (): SaveProductCategoryRequest => ({
  type: ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_REQUEST
});

export const saveProductCategorySuccess = (
  response: ResultService<ProductCategory>
): SaveProductCategorySuccess => ({
  type: ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_SUCCESS,
  payload: response
});

export const saveProductCategoryFailure = (
  error: string
): SaveProductCategoryFailure => ({
  type: ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_FAILURE,
  payload: error
});

export const deleteProductCategorySuccess = (
  categoryCode: string
): DeleteProductCategorySuccess => ({
  type: ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS,
  payload: categoryCode
});
export const deleteProductCategoryFailure = (
  error: string
): ProductCategoryAction => ({
  type: ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_FAILURE,
  payload: error
});

export const fetchProductCategories = (): ThunkAction<
  Promise<ProductCategoryAction>,
  RootState,
  unknown,
  ProductCategoryAction
> => async (dispatch) => {
  dispatch(fetchProductCategoriesRequest());
  try {
    const response = await getAllProductCategory();

    if (response.code === "0") {

      const successAction = fetchProductCategoriesSuccess(response.data!);

      dispatch(successAction);
      return successAction;
    } else {

      const failureAction = fetchProductCategoriesFailure(response.message || "Failed to fetch Data");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = fetchProductCategoriesFailure(error instanceof Error ? error.message : "Failed to fetch");

    dispatch(failureAction);
    return failureAction;
  }
};

export const addOrUpdateProductCategory = (
  productCategory: ProductCategory
): ThunkAction<Promise<ProductCategoryAction>, RootState, unknown, ProductCategoryAction> => async (dispatch) => {
  dispatch(saveProductCategoryRequest());
  try {
    const response = await saveProductCategory(productCategory);

    if (response.code === "0") {

      const successAction = saveProductCategorySuccess(response);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = saveProductCategoryFailure(response.message || "Failed to save");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = saveProductCategoryFailure(error instanceof Error ? error.message : "Failed to save");

    dispatch(failureAction);
    return failureAction;
  }
};

export const removeProductCategory = (
  categoryCode: string
): ThunkAction<Promise<ProductCategoryAction>, RootState, unknown, ProductCategoryAction> => async (dispatch) => {
  try {
    const response = await deleteProductCategory(categoryCode);

    if (response.code === "0") {
      const successAction = deleteProductCategorySuccess(categoryCode);

      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = deleteProductCategoryFailure(response.message || "Failed to delete");

      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {

    const failureAction = deleteProductCategoryFailure(
      error instanceof Error ? error.message : "Failed to delete" );
      
    dispatch(failureAction);
    return failureAction;
  }
};