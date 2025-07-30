import { createSlice } from "@reduxjs/toolkit";
import { DeleteGoodsReceiptNoteFailure, DeleteGoodsReceiptNoteLineFailure, DeleteGoodsReceiptNoteLineSuccess, DeleteGoodsReceiptNoteSuccess, FetchGoodsReceiptNoteFailure, FetchGoodsReceiptNoteLineFailure, FetchGoodsReceiptNoteLineSucess, FetchGoodsReceiptNoteSucess, GoodsReceiptNote_Line_ActionTypes, GoodsReceiptNoteActionTypes, GoodsReceiptNoteState, SaveGoodsReceiptNote_Param_Failure, SaveGoodsReceiptNote_Param_Success, SaveGoodsReceiptNoteFailure, SaveGoodsReceiptNoteSuccess } from "./types";

const initialState: GoodsReceiptNoteState = {
    GoodsReceiptNotes: [],
    GoodsReceiptNoteLine: [],
    loading: false,
    error: null,
}

const GoodsReceiptNoteSlice = createSlice({
    name: "goodsReceiptNote",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get GoodsReceiptNote
            .addCase(GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_SUCCESS, (state, action: FetchGoodsReceiptNoteSucess) => {
                state.loading = false;
                state.GoodsReceiptNotes = action.payload;
            })

            .addCase(GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_FAILURE, (state, action: FetchGoodsReceiptNoteFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Line
            .addCase(GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_SUCCESS, (state, action: FetchGoodsReceiptNoteLineSucess) => {
                state.loading = false;
                state.GoodsReceiptNoteLine = action.payload;
            })
            .addCase(GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_FAILURE, (state, action: FetchGoodsReceiptNoteLineFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save transactionType
            .addCase(GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_SUCCESS, (state, action: SaveGoodsReceiptNoteSuccess) => {
                state.loading = false;
                const index = state.GoodsReceiptNotes.findIndex(
                    (tt) => tt.grnCode === action.payload.grnCode
                );
                if (index !== -1) {
                    state.GoodsReceiptNotes[index] = action.payload;
                }
                else {
                    state.GoodsReceiptNotes.push(action.payload);
                }
            })
            .addCase(GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_FAILURE, (state, action: SaveGoodsReceiptNoteFailure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Save transactionType Param
            .addCase(GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_REQUEST, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_SUCCESS, (state, action: SaveGoodsReceiptNote_Param_Success) => {
                state.loading = false;
                const { grNs, grnLines } = action.payload;

                // Cập nhật hoặc thêm mới GoodsReceiptNote
                const grnIndex = state.GoodsReceiptNotes.findIndex(
                    (tt) => tt.grnCode === grNs.grnCode
                );
                if (grnIndex !== -1) {
                    state.GoodsReceiptNotes[grnIndex] = grNs;
                } else {
                    state.GoodsReceiptNotes.push(grNs);
                }

                state.GoodsReceiptNoteLine = grnLines

            })
            .addCase(GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_FAILURE, (state, action: SaveGoodsReceiptNote_Param_Failure) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete transactionType
            .addCase(GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_FAILURE, (state, action: DeleteGoodsReceiptNoteFailure) => {
                state.GoodsReceiptNotes = state.GoodsReceiptNotes.filter(
                    (tt) => tt.grnCode !== action.payload
                );
            })
            .addCase(GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_SUCCESS, (state, action: DeleteGoodsReceiptNoteSuccess) => {
                state.error = action.payload;
            })
            // Delete transactionType Line
            .addCase(GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_FAILURE, (state, action: DeleteGoodsReceiptNoteLineFailure) => {
                state.GoodsReceiptNoteLine = state.GoodsReceiptNoteLine.filter(
                    (tt) => tt.rowPointer !== action.payload
                );
            })
            .addCase(GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_SUCCESS, (state, action: DeleteGoodsReceiptNoteLineSuccess) => {
                state.error = action.payload;
            });
    },
});

export default GoodsReceiptNoteSlice.reducer;