import { DeleteProductUoMConversionFailure, DeleteProductUoMConversionSuccess, FetchProductUoMConversionsFailure, FetchProductUoMConversionsSuccess, GetProductUoMConversionByCodeFailure, GetProductUoMConversionByCodeSuccess, ProductUoMConversionActionTypes, ProductUoMConversionState, SaveProductUoMConversionFailure, SaveProductUoMConversionSuccess } from "./types";

const initialState: ProductUoMConversionState = {
    productUoMConversions: [],
    loading: false,
    error: null,
}

import { createSlice } from "@reduxjs/toolkit";

const ProductUoMConversionSlice = createSlice({
    name: 'productUoMConversion',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch product UoM conversions
            .addCase(ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_SUCCESS, (state, action: FetchProductUoMConversionsSuccess) => {
                state.loading = false;
                state.productUoMConversions = action.payload;
            })
            .addCase(ProductUoMConversionActionTypes.FETCH_PRODUCT_UOM_CONVERSIONS_FAILURE, (state, action: FetchProductUoMConversionsFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save product UoM conversion
            .addCase(ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_SUCCESS, (state, action: SaveProductUoMConversionSuccess) => {
                state.loading = false;
                const index = state.productUoMConversions.findIndex(
                    (conversion) => conversion.productUoMConversionCode === action.payload.data!.productUoMConversionCode
                );
                if (index !== -1) {
                    state.productUoMConversions[index] = action.payload.data!;
                } else {
                    state.productUoMConversions.push(action.payload.data!);
                }
            })
            .addCase(ProductUoMConversionActionTypes.SAVE_PRODUCT_UOM_CONVERSION_FAILURE, (state, action: SaveProductUoMConversionFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get product UoM conversion by code
            .addCase(ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_SUCCESS, (state, action: GetProductUoMConversionByCodeSuccess) => {
                state.loading = false;
                const index = state.productUoMConversions.findIndex(
                    (conversion) => conversion.productUoMConversionCode === action.payload.data!.productUoMConversionCode
                );
                if (index !== -1) {
                    state.productUoMConversions[index] = action.payload.data!;
                } else {
                    state.productUoMConversions.push(action.payload.data!);
                }
            })
            .addCase(ProductUoMConversionActionTypes.GET_PRODUCT_UOM_CONVERSION_BY_CODE_FAILURE, (state, action: GetProductUoMConversionByCodeFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete product UoM conversion
            .addCase(ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_SUCCESS,
                (state, action: DeleteProductUoMConversionSuccess) => {
                    state.productUoMConversions = state.productUoMConversions.filter(
                        (conversion) => conversion.productUoMConversionCode !== action.payload
                    );
                })
            .addCase(ProductUoMConversionActionTypes.DELETE_PRODUCT_UOM_CONVERSION_FAILURE, (state, action: DeleteProductUoMConversionFailure) => {
                state.error = action.payload;
            });
    }
});

export default ProductUoMConversionSlice.reducer;