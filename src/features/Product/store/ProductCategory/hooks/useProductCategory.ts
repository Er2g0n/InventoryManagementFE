import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  fetchProductCategories,
  addOrUpdateProductCategory,
  removeProductCategory
} from '../actions';
import { ProductCategory } from '@/types/MasterData/Product/ProductClassification';

export const useProductCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productCategories : ProductCategory[] = useSelector((state: RootState) => state.productCategory.productCategories);
  const loading = useSelector((state: RootState) => state.productCategory.loading);
  const error = useSelector((state: RootState) => state.productCategory.error);

  const loadProductCategories = () => dispatch(fetchProductCategories());
  const saveProductCategory = (productCategory: ProductCategory) => 
    dispatch(addOrUpdateProductCategory(productCategory));
  const deleteProductCategory = (categoryCode: string) => 
    dispatch(removeProductCategory(categoryCode));

  return {
    productCategories,
    loading,
    error,
    loadProductCategories,
    saveProductCategory,
    deleteProductCategory
  };
};