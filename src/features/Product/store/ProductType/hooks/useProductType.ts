import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateProductType, fetchProductTypes, removeProductType } from "../actions";
import { ProductType } from "@/types/MasterData/Product/ProductClassification";
import { ProductTypeActionTypes } from "../types";

export const useProductTypes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productTypes = useSelector((state: RootState) => state.productType.productTypes);
  const loading = useSelector((state: RootState) => state.productType.loading);
  const error = useSelector((state: RootState) => state.productType.error);

  const loadProductTypes = (): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(fetchProductTypes())
        .then((action) => {
          if (action.type === ProductTypeActionTypes.FETCH_PRODUCT_TYPES_SUCCESS) {
            resolve({ success: true });
          } else {
            resolve({
              success: false,
              message: "Failed to fetch product types.",
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while fetching product types.",
          });
        });
    });

  const saveProductType = (productType: ProductType): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateProductType(productType))
        .then((action) => {
          if (action.type === ProductTypeActionTypes.SAVE_PRODUCT_TYPE_SUCCESS) {
            resolve({ success: true, message: action.payload.message });
          } else if (action.type === ProductTypeActionTypes.SAVE_PRODUCT_TYPE_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to save product type." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while saving product type.",
          });
        });
    });

  const deleteProductType = (typeCode: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeProductType(typeCode))
        .then((action) => {
          if (action.type === ProductTypeActionTypes.DELETE_PRODUCT_TYPE_SUCCESS) {
            resolve({ success: true, message: action.payload });
          } else if (action.type === ProductTypeActionTypes.DELETE_PRODUCT_TYPE_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to delete product type." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while deleting product type.",
          });
        });
    });

  return {
    productTypes,
    loading,
    error,
    loadProductTypes,
    saveProductType,
    deleteProductType,
  };
};
