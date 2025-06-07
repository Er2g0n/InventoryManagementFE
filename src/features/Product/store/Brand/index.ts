import { BrandActionTypes, BrandState, DeleteBrandFailure, DeleteBrandSuccess, FetchBrandsFailure, FetchBrandsSuccess, SaveBrandFailure, SaveBrandSuccess } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BrandState = {
    brands: [],
    loading: false,
    error: null,
}
const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch brands
            .addCase(BrandActionTypes.FETCH_BRANDS_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(BrandActionTypes.FETCH_BRANDS_SUCCESS, (state, action: FetchBrandsSuccess) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(BrandActionTypes.FETCH_BRANDS_FAILURE, (state, action: FetchBrandsFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save brand
            .addCase(BrandActionTypes.SAVE_BRAND_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(BrandActionTypes.SAVE_BRAND_SUCCESS, (state, action: SaveBrandSuccess) => {
                state.loading = false;
                const index = state.brands.findIndex(
                    (b) => b.brandCode === action.payload.brandCode
                );
                if (index !== -1) {
                    state.brands[index] = action.payload;
                } else {
                    state.brands.push(action.payload);
                }
            })
            .addCase(BrandActionTypes.SAVE_BRAND_FAILURE, (state, action: SaveBrandFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete brand
            .addCase(BrandActionTypes.DELETE_BRAND_SUCCESS, (state, action: DeleteBrandSuccess) => {
                state.brands = state.brands.filter(
                    (b) => b.brandCode !== action.payload
                );
            })
            .addCase(BrandActionTypes.DELETE_BRAND_FAILURE, (state, action: DeleteBrandFailure) => {
                state.error = action.payload;
            });
        }
    });
    
    export default brandSlice.reducer;