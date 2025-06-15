import { AppDispatch, RootState } from "@/store/store";
import { addOrUpdateBrand, fetchBrands, removeBrand } from "../action";
import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { useDispatch, useSelector } from "react-redux";
import { BrandActionTypes } from "../types"; // Giả định đã có BrandActionTypes

export const useBrands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brands = useSelector((state: RootState) => state.brand.brands);
  const loading = useSelector((state: RootState) => state.brand.loading);
  const error = useSelector((state: RootState) => state.brand.error);

  const loadBrands = (): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(fetchBrands())
        .then((action) => {
          if (action.type === BrandActionTypes.FETCH_BRANDS_SUCCESS) {
            resolve({ success: true });
          } else {
            resolve({
              success: false,
              message: "Failed to fetch brands.",
            });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while fetching brands.",
          });
        });
    });

  const saveBrand = (brand: Brand): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateBrand(brand))
        .then((action) => {
          if (action.type === BrandActionTypes.SAVE_BRAND_SUCCESS) {
            resolve({ success: true, message: action.payload.message });
          } else if (action.type === BrandActionTypes.SAVE_BRAND_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to save brand." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while saving brand.",
          });
        });
    });

  const deleteBrand = (brandCode: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeBrand(brandCode))
        .then((action) => {
          if (action.type === BrandActionTypes.DELETE_BRAND_SUCCESS) {
            resolve({ success: true, message: action.payload });
          } else if (action.type === BrandActionTypes.DELETE_BRAND_FAILURE) {
            resolve({ success: false, message: action.payload || "Failed to delete brand." });
          }
        })
        .catch((error) => {
          reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while deleting brand.",
          });
        });
    });

  return {
    brands,
    loading,
    error,
    loadBrands,
    saveBrand,
    deleteBrand,
  };
};