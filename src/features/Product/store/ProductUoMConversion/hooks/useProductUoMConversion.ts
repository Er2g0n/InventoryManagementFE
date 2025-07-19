import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { deleteProductUoMConversion, fetchProductUoMConversions, getProductUoMConversionByCode, saveProductUoMConversion } from "../actions";
import { ProductUoMConversionActionTypes } from "../types";
import { ProductUoMConversion } from "@/types/MasterData/Product/ProductManagement";

export const useProductUoMConversion = () => {
    const dispatch = useDispatch<AppDispatch>();
    const productUoMConversions = useSelector((state: RootState) => state.productUoMConversion.productUoMConversions);
    const loading = useSelector((state: RootState) => state.productUoMConversion.loading);
    const error = useSelector((state: RootState) => state.productUoMConversion.error);

    const loadProductUoMConversions = (): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(fetchProductUoMConversions())
                .then((action) => {
                    if (action.type === ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_SUCCESS) {
                        resolve({ success: true });
                    } else {
                        resolve({
                            success: false,
                            message: "Failed to fetch product UoM conversions.",
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while fetching product UoM conversions.",
                    });
                });
        });


    const saveConversion = (productUoMConversion: ProductUoMConversion): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(saveProductUoMConversion(productUoMConversion))
                .then((action) => {
                    if (action.type === ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_SUCCESS) {
                        resolve({ success: true, message: action.payload.message });
                    } else if (action.type === ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_FAILURE) {
                        resolve({ success: false, message: action.payload || "Failed to save product UoM conversion." });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while saving product UoM conversion.",
                    });
                });
        });


    const getProductUoMConversions = (code: string): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(getProductUoMConversionByCode(code))
                .then((action) => {
                    if (action.type === ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_SUCCESS) {
                        resolve({ success: true });
                    } else {
                        resolve({
                            success: false,
                            message: "Failed to get product UoM conversion by code.",
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while getting product UoM conversion by code.",
                    });
                });
        });

    const deleteConversion = (productUoMConversionCode: string): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(deleteProductUoMConversion(productUoMConversionCode))
                .then((action) => {
                    if (action.type === ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_SUCCESS) {
                        resolve({ success: true, message: action.payload });
                    } else if (action.type === ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_FAILURE) {
                        resolve({ success: false, message: action.payload || "Failed to delete product UoM conversion." });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while deleting product UoM conversion.",
                    });
                });
        });

    return {
        productUoMConversions,
        loading,
        error,
        loadProductUoMConversions,
        saveConversion,
        getProductUoMConversions,
        deleteConversion,
    };
}