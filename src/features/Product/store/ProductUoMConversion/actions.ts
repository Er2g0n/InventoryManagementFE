import { ProductUoMConversion } from "@/types/MasterData/Product/ProductManagement";
import { DeleteProductUoMConversionFailure, DeleteProductUoMConversionSuccess, FetchProductUoMConversionsFailure, FetchProductUoMConversionsRequest, FetchProductUoMConversionsSuccess, GetProductUoMConversionByCodeRequest, GetProductUoMConversionByCodeSuccess, ProductUoMConversionAction, ProductUoMConversionActionTypes, SaveProductUoMConversionFailure, SaveProductUoMConversionRequest, SaveProductUoMConversionSuccess } from "./types";
import { ResultService } from "@/types/Base/ResultService";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { deleteConversion, getAllProductUoMConversions, getProductUoMConversion, saveConversion } from "@features/Product/Services/ProductUoMConversionService";

export const fetchProductUoMConversionsRequest = (): FetchProductUoMConversionsRequest => ({
    type: ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_REQUEST,
});

export const fetchProductUoMConversionsSuccess = (
    productUoMConversions: ProductUoMConversion[]
): FetchProductUoMConversionsSuccess => ({
    type: ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_SUCCESS,
    payload: productUoMConversions,
});

export const fetchProductUoMConversionsFailure = (
    error: string
): FetchProductUoMConversionsFailure => ({
    type: ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_FAILURE,
    payload: error,
});

export const saveProductUoMConversionRequest = (): SaveProductUoMConversionRequest => ({
    type: ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_REQUEST,
});

export const saveProductUoMConversionSuccess = (
    response: ResultService<ProductUoMConversion>
): SaveProductUoMConversionSuccess => ({
    type: ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_SUCCESS,
    payload: response,
});

export const saveProductUoMConversionFailure = (
    error: string
): SaveProductUoMConversionFailure => ({
    type: ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_FAILURE,
    payload: error,
});

export const getProductUoMConversionRequest = (): GetProductUoMConversionByCodeRequest => ({
    type: ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_REQUEST,
});
export const getProductUoMConversionSuccess = (
    response: ResultService<ProductUoMConversion>
): GetProductUoMConversionByCodeSuccess => ({
    type: ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_SUCCESS,
    payload: response,
});

export const deleteProductUoMConversionSuccess = (
    productUoMConversionCode: string
): DeleteProductUoMConversionSuccess => ({
    type: ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_SUCCESS,
    payload: productUoMConversionCode,
});
export const deleteProductUoMConversionFailure = (
    error: string
): DeleteProductUoMConversionFailure => ({
    type: ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_FAILURE,
    payload: error,
});


//Thực thi actions
export const fetchProductUoMConversions = (): ThunkAction<
    Promise<ProductUoMConversionAction>,
    RootState,
    unknown,
    ProductUoMConversionAction
> => async (dispatch) => {
    dispatch(fetchProductUoMConversionsRequest());
    try {
        const response = await getAllProductUoMConversions();
        if (response.code === "0" && response.data) {
            const successAction = fetchProductUoMConversionsSuccess(response.data);
            dispatch(successAction);
            return successAction;
        } else {
            const failureAction = fetchProductUoMConversionsFailure(response.message || 'Failed to fetch product conversions');
            dispatch(failureAction);
            return failureAction;
        }
    } catch (error) {
        const failureAction = fetchProductUoMConversionsFailure(
            error instanceof Error ? error.message : 'Failed to fetch product conversions'
        );
        dispatch(failureAction);
        return failureAction;
    }
};

export const saveProductUoMConversion = (
    productUoMConversion: ProductUoMConversion
): ThunkAction<
    Promise<ProductUoMConversionAction>,
    RootState,
    unknown,
    ProductUoMConversionAction
> => async (dispatch) => {
    dispatch(saveProductUoMConversionRequest());
    try {
        const response = await saveConversion(productUoMConversion);
        if (response.code === "0" && response.data) {
            const successAction = saveProductUoMConversionSuccess(response);
            dispatch(successAction);
            return successAction;
        } else {
            const failureAction = saveProductUoMConversionFailure(response.message || 'Failed to save product conversion');
            dispatch(failureAction);
            return failureAction;
        }
    } catch (error) {
        const failureAction = saveProductUoMConversionFailure(
            error instanceof Error ? error.message : 'Failed to save product conversion'
        );
        dispatch(failureAction);
        return failureAction;
    }
}




export const getProductUoMConversionByCode = (
    productUoMConversionCode: string
): ThunkAction<
    Promise<ProductUoMConversionAction>,
    RootState,
    unknown,
    ProductUoMConversionAction
> => async (dispatch) => {
    dispatch(getProductUoMConversionRequest());
    try {
        const response = await getProductUoMConversion(productUoMConversionCode);
        if (response.code === "0" && response.data) {
            const successAction = getProductUoMConversionSuccess(response);
            dispatch(successAction);
            return successAction;
        } else {
            const failureAction = fetchProductUoMConversionsFailure(response.message || 'Failed to fetch product conversion by code');
            dispatch(failureAction);
            return failureAction;
        }
    } catch (error) {
        const failureAction = fetchProductUoMConversionsFailure(
            error instanceof Error ? error.message : 'Failed to fetch product conversion by code'
        );
        dispatch(failureAction);
        return failureAction;
    }
};

export const deleteProductUoMConversion = (
    productUoMConversionCode: string
): ThunkAction<
    Promise<ProductUoMConversionAction>,
    RootState,
    unknown,
    ProductUoMConversionAction
> => async (dispatch) => {
    try {
        const response = await deleteConversion(productUoMConversionCode);
        if (response.code === "0") {
            const successAction = deleteProductUoMConversionSuccess(productUoMConversionCode);
            dispatch(successAction);
            return successAction;
        } else {
            const failureAction = deleteProductUoMConversionFailure(response.message || 'Failed to delete product conversion');
            dispatch(failureAction);
            return failureAction;
        }
    } catch (error) {
        const failureAction = deleteProductUoMConversionFailure(
            error instanceof Error ? error.message : 'Failed to delete product conversion'
        );
        dispatch(failureAction);
        return failureAction;
    }
};