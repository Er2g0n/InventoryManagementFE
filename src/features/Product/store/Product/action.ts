import { ProductParam, ProductSave } from "@/types/MasterData/Product/ProductManagement";
import { DeleteProductFailure, DeleteProductSuccess, FetchProductsFailure, FetchProductsRequest, FetchProductsSuccess, GetProductByCodeFailure, GetProductByCodeRequest, GetProductByCodeSuccess, ProductAction, ProductActionTypes, SaveProductFailure, SaveProductRequest, SaveProductSuccess } from "./types";
import { ResultService } from "@/types/Base/ResultService";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { getAllProducts, getProductByCodeParam, saveProduct } from "@features/Product/Services/ProductService";

export const fetchProductsRequest = (): FetchProductsRequest => ({
    type: ProductActionTypes.FETCH_PRODUCTS_REQUEST,
})

export const fetchProductsSuccess = (
    products: ProductParam[]
): FetchProductsSuccess => ({
    type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products,
});

export const fetchProductsFailure = (
    error: string
): FetchProductsFailure => ({
    type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
    payload: error,
});

export const saveProductRequest = (): SaveProductRequest => ({
    type: ProductActionTypes.SAVE_PRODUCT_REQUEST,
});

export const saveProductSuccess = (
    response: ResultService<ProductParam>
): SaveProductSuccess => ({
    type: ProductActionTypes.SAVE_PRODUCT_SUCCESS,
    payload: response,
});

export const saveProductFailure = (
    error: string
): SaveProductFailure => ({
    type: ProductActionTypes.SAVE_PRODUCT_FAILURE,
    payload: error,
});

export const getProductByCodeRequest = (): GetProductByCodeRequest => ({
    type: ProductActionTypes.GET_PRODUCT_BY_CODE_REQUEST,
});

export const getProductByCodeSuccess = (
    response: ResultService<ProductParam>
): GetProductByCodeSuccess => ({
    type: ProductActionTypes.GET_PRODUCT_BY_CODE_SUCCESS,
    payload: response,
});

export const getProductByCodeFailure = (
    error: string
): GetProductByCodeFailure => ({
    type: ProductActionTypes.GET_PRODUCT_BY_CODE_FAILURE,
    payload: error,
});
export const deleteProductSuccess = (
    productCode: string
): DeleteProductSuccess => ({
    type: ProductActionTypes.DELETE_PRODUCT_SUCCESS,
    payload: productCode,
});

export const deleteProductFailure = (
    error: string
): DeleteProductFailure => ({
    type: ProductActionTypes.DELETE_PRODUCT_FAILURE,
    payload: error,
});

export const fetchProducts = (): ThunkAction<
    Promise<ProductAction>,
    RootState,
    unknown,
    ProductAction
> => async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
        const response = await getAllProducts();
        if (response.code === "0") {
            const successAction = fetchProductsSuccess(response.data!);
            dispatch(successAction);
            return successAction;
        } else {
            const failureAction = fetchProductsFailure(response.message || 'Failed to fetch products');
            dispatch(failureAction);
            return failureAction;
        }
    }catch (error) {
        const failureAction = fetchProductsFailure(error instanceof Error ? error.message : 'Failed to fetch products');
        dispatch(failureAction);
        return failureAction;
    }
}

export const addOrUpdateProduct = (
    product: ProductSave
): ThunkAction<Promise<ProductAction>, RootState, unknown, ProductAction> => async (dispatch) => {
    dispatch(saveProductRequest());
    try {
        const response = await saveProduct(product);
        if(response.code =="0") 
        {
            var successAction = saveProductSuccess(response);
            dispatch(successAction);
            return successAction;
        }
        else {
            var failureAction = saveProductFailure(response.message|| 'Failed to save Product');
            dispatch(failureAction);
            return failureAction;
        }
    } catch (error) {
        var failureAction = saveProductFailure(error instanceof Error ? error.message : 'Failed to save product');
        dispatch(failureAction);
        return failureAction;
        
    }
};

export const getProductByCode = (
  productCode: string
): ThunkAction<Promise<ProductAction>, RootState, unknown, ProductAction> => async (dispatch) => {
  dispatch(getProductByCodeRequest());
  try {
    const response = await getProductByCodeParam(productCode);
    if (response.code === "0") {
      const successAction = getProductByCodeSuccess(response);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = getProductByCodeFailure(response.message || 'Failed to fetch product by code');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = getProductByCodeFailure(error instanceof Error ? error.message : 'Failed to fetch product by code');
    dispatch(failureAction);
    return failureAction;
  }
};