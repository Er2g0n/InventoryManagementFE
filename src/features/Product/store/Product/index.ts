import { createSlice } from "@reduxjs/toolkit";
import { FetchProductsFailure, FetchProductsSuccess, GetProductByCodeFailure, GetProductByCodeSuccess, ProductActionTypes, ProductState, SaveProductFailure, SaveProductSuccess } from "./types";
import { ProductParam } from "@/types/MasterData/Product/ProductManagement";

const initialState: ProductState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(ProductActionTypes.FETCH_PRODUCTS_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductActionTypes.FETCH_PRODUCTS_SUCCESS, (state, action: FetchProductsSuccess) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(ProductActionTypes.FETCH_PRODUCTS_FAILURE, (state, action: FetchProductsFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save product
            .addCase(ProductActionTypes.SAVE_PRODUCT_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductActionTypes.SAVE_PRODUCT_SUCCESS, (state, action: SaveProductSuccess) => {
                state.loading = false;
                const index = state.products.findIndex(
                    (p) => p.productCode === action.payload.data!.productCode
                );
                if (index !== -1) {
                    state.products[index] = action.payload.data!;
                } else {
                    state.products.push(action.payload.data!);
                }
            })
            .addCase(ProductActionTypes.SAVE_PRODUCT_FAILURE, (state, action: SaveProductFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get product by code
            .addCase(ProductActionTypes.GET_PRODUCT_BY_CODE_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ProductActionTypes.GET_PRODUCT_BY_CODE_SUCCESS, (state, action: GetProductByCodeSuccess) => {

                state.product = action.payload.data as ProductParam;
                if (!state.product) {
                    state.error = "Product not found";
                }
                state.loading = false;
            })
            .addCase(ProductActionTypes.GET_PRODUCT_BY_CODE_FAILURE, (state, action: GetProductByCodeFailure) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});

export default productSlice.reducer;