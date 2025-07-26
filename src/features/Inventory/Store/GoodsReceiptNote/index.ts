import { createSlice } from "@reduxjs/toolkit";
import { DeleteGoodsReceiptNoteFailure, DeleteGoodsReceiptNoteSuccess, FetchGoodsReceiptNoteFailure, FetchGoodsReceiptNoteLineFailure, FetchGoodsReceiptNoteLineSucess, FetchGoodsReceiptNoteSucess, GoodsReceiptNote_Line_ActionTypes, GoodsReceiptNoteActionTypes, GoodsReceiptNoteState, SaveGoodsReceiptNoteFailure, SaveGoodsReceiptNoteSuccess } from "./types";

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
            // Delete transactionType
            .addCase(GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_FAILURE, (state, action: DeleteGoodsReceiptNoteFailure) => {
                state.GoodsReceiptNotes = state.GoodsReceiptNotes.filter(
                    (tt) => tt.grnCode !== action.payload
                );
            })
            .addCase(GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_SUCCESS, (state, action: DeleteGoodsReceiptNoteSuccess) => {
                state.error = action.payload;
            });
    },
});

export default GoodsReceiptNoteSlice.reducer;