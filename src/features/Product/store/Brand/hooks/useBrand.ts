import { AppDispatch, RootState } from "@/store/store";
import { addOrUpdateBrand, fetchBrands, removeBrand } from "../action";
import { Brand } from "@/types/MasterData/Product/ProductClassification";
import { useDispatch, useSelector } from "react-redux";

export const useBrands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brands = useSelector((state: RootState) => state.brand.brands);
  const loading = useSelector((state: RootState) => state.brand.loading);
  const error = useSelector((state: RootState) => state.brand.error);

  const loadBrands = () => dispatch(fetchBrands());
  const saveBrand = (brand: Brand) => dispatch(addOrUpdateBrand(brand));
  const deleteBrand = (brandCode: string) => dispatch(removeBrand(brandCode));

  return {
    brands,
    loading,
    error,
    loadBrands,
    saveBrand,
    deleteBrand
  };
}