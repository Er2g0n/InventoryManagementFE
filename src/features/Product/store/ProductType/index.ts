import { DeleteProductTypeFailure, DeleteProductTypeSuccess, FetchProductTypesFailure, FetchProductTypesSuccess, ProductTypeActionTypes, ProductTypeState, SaveProductTypeFailure, SaveProductTypeSuccess } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductTypeState = {
  productTypes: [],
    loading: false,
    error: null,
};

const ProductTypeSlide = createSlice({
    name: 'productType',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch product types
            .addCase(ProductTypeActionTypes.FETCH_PRODUCT_TYPES_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductTypeActionTypes.FETCH_PRODUCT_TYPES_SUCCESS, (state, action: FetchProductTypesSuccess) => {
                state.loading = false;
                state.productTypes = action.payload;
            })
            .addCase(ProductTypeActionTypes.FETCH_PRODUCT_TYPES_FAILURE, (state, action: FetchProductTypesFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save product type
            .addCase(ProductTypeActionTypes.SAVE_PRODUCT_TYPE_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductTypeActionTypes.SAVE_PRODUCT_TYPE_SUCCESS, (state, action: SaveProductTypeSuccess) => {
                state.loading = false;
                const index = state.productTypes.findIndex(
                    (pt) => pt.productTypeCode === action.payload.productTypeCode
                );
                if (index !== -1) {
                    state.productTypes[index] = action.payload;
                } else {
                    state.productTypes.push(action.payload);
                }
            })
            .addCase(ProductTypeActionTypes.SAVE_PRODUCT_TYPE_FAILURE, (state, action: SaveProductTypeFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete product type
            .addCase(ProductTypeActionTypes.DELETE_PRODUCT_TYPE_SUCCESS, (state, action: DeleteProductTypeSuccess) => {
                state.productTypes = state.productTypes.filter(
                    (pt) => pt.productTypeCode !== action.payload
                );
            })
            .addCase(ProductTypeActionTypes.DELETE_PRODUCT_TYPE_FAILURE, (state, action: DeleteProductTypeFailure) => {
                state.error = action.payload;
            });
    }
});

export default ProductTypeSlide.reducer;