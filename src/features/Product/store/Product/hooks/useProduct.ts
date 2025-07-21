import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateProduct, fetchProducts, getProductByCode } from "../action";
import { ProductActionTypes } from "../types";
import { ProductSave } from "@/types/MasterData/Product/ProductManagement";

export const useProducts = () =>{
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);
    const product = useSelector((state: RootState) => state.product.product);
    const loading = useSelector((state: RootState) => state.product.loading);
    const error = useSelector((state: RootState) => state.product.error);

    const loadProducts = (): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(fetchProducts())
                .then((action) => {
                    if (action.type === ProductActionTypes.FETCH_PRODUCTS_SUCCESS) {
                        resolve({ success: true });
                    } else {
                        resolve({
                            success: false,
                            message: "Failed to fetch products.",
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while fetching products.",
                    });
                });
    });

    const saveProduct = (product: ProductSave): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(addOrUpdateProduct(product))
                .then((action) => {
                    if (action.type === ProductActionTypes.SAVE_PRODUCT_SUCCESS) {
                        resolve({ success: true, message: action.payload.message });
                    } else if (action.type === ProductActionTypes.SAVE_PRODUCT_FAILURE) {
                        resolve({ success: false, message: action.payload || "Failed to save product." });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while saving product.",
                    });
                });
        });

    const usegetProductByCode = (productCode: string): Promise<{ success: boolean; message?: string }> =>
        new Promise((resolve, reject) => {
            dispatch(getProductByCode(productCode))
                .then((action) => {
                    if (action.type === ProductActionTypes.GET_PRODUCT_BY_CODE_SUCCESS) {
                        resolve({ success: true });
                    } else {
                        resolve({
                            success: false,
                            message: "Failed to fetch product by code.",
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        success: false,
                        message: error instanceof Error ? error.message : "An error occurred while fetching product by code.",
                    });
                });
        });

    return {
        product,
        products,
        loading,
        error,
        loadProducts,
        saveProduct,
        usegetProductByCode
    };
}