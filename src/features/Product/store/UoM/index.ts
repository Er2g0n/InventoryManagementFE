import { DeleteUoMFailure, DeleteUoMSuccess, FetchUoMFailure, FetchUoMSuccess, SaveUoMFailure, SaveUoMSuccess, UoMActionTypes, UoMState } from "./types";

const initialState: UoMState = {
    uoMList: [],
    loading: false,
    error: null,
};
import { createSlice } from "@reduxjs/toolkit";

const uoMSlice = createSlice({
    name: 'uoM',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch UoM
            .addCase(UoMActionTypes.FETCH_UOM_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UoMActionTypes.FETCH_UOM_SUCCESS, (state, action: FetchUoMSuccess) => {
                state.loading = false;
                state.uoMList = action.payload;
            })
            .addCase(UoMActionTypes.FETCH_UOM_FAILURE, (state, action: FetchUoMFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save UoM
            .addCase(UoMActionTypes.SAVE_UOM_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UoMActionTypes.SAVE_UOM_SUCCESS, (state, action: SaveUoMSuccess) => {
                state.loading = false;
                const index = state.uoMList.findIndex(
                    (uom) => uom.uoMCode === action.payload.data!.uoMCode
                );
                if (index !== -1) {
                    state.uoMList[index] = action.payload.data!;
                } else {
                    state.uoMList.push(action.payload.data!);
                }
            })
            .addCase(UoMActionTypes.SAVE_UOM_FAILURE, (state, action: SaveUoMFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete UoM
            .addCase(UoMActionTypes.DELETE_UOM_SUCCESS, (state, action: DeleteUoMSuccess) => {
                const uomCode = action.payload;
                state.uoMList = state.uoMList.filter(uom => uom.uoMCode !== uomCode);
            })
            .addCase(UoMActionTypes.DELETE_UOM_FAILURE, (state, action: DeleteUoMFailure) => {
                state.error = action.payload;
            });
    },
});

export default uoMSlice.reducer;
