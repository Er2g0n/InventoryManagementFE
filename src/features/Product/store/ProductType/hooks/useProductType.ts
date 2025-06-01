import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateProductType, fetchProductTypes, removeProductType } from "../actions";
import { ProductType } from "@/types/MasterData/Product/ProductClassification";

export const useProductTypes = () => {
    const dispatch = useDispatch<AppDispatch>();
    const productTypes = useSelector((state: RootState) => state.productType.productTypes);
    const loading = useSelector((state: RootState) => state.productType.loading);
    const error = useSelector((state: RootState) => state.productType.error);
    
    const loadProductTypes = () => dispatch(fetchProductTypes());
    const saveProductType = (productType: ProductType) => 
        dispatch(addOrUpdateProductType(productType));
    const deleteProductType = (typeCode: string) => 
        dispatch(removeProductType(typeCode));
    
    return {
        productTypes,
        loading,
        error,
        loadProductTypes,
        saveProductType,
        deleteProductType
    };
}