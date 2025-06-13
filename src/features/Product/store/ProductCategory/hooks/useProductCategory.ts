import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  fetchProductCategories,
  addOrUpdateProductCategory,
  removeProductCategory
} from '../actions';
import { ProductCategory } from '@/types/MasterData/Product/ProductClassification';
import { ProductCategoryActionTypes } from "../types";

export const useProductCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productCategories = useSelector((state: RootState) => state.productCategory.productCategories);
  const loading = useSelector((state: RootState) => state.productCategory.loading);
  const error = useSelector((state: RootState) => state.productCategory.error);

  const loadProductCategories = (): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(fetchProductCategories())
        .then((action) => {
          if (action.type === ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS) {
            resolve({ success: true });
          } else {
            resolve({
              success: false,
              message: "Failed to fetch product categories.",
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while fetching product categories.",
          });
        });
    });

  const saveProductCategory = (productCategory: ProductCategory): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateProductCategory(productCategory))
        .then((action) => {
          if (action.type === ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_SUCCESS) {
            resolve({ success: true, message: action.payload.message });
          } else if (action.type === ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to save product category." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while saving product category.",
          });
        });
    });

  const deleteProductCategory = (categoryCode: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeProductCategory(categoryCode))
        .then((action) => {
          if (action.type === ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS) {
            resolve({ success: true, message: action.payload });
          } else if (action.type === ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to delete product category." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while deleting product category.",
          });
        });
    });

  return {
    productCategories,
    loading,
    error,
    loadProductCategories,
    saveProductCategory,
    deleteProductCategory,
  };
};
