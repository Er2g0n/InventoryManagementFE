import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { addOrUpdateGoodsReceiptNote, fetchGoodsReceiptNote, removeGoodsReceiptNote } from "../action";
import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";
import { GoodsReceiptNoteActionTypes } from "../types";

export const useGoodsReceiptNote = () => {
    const dispatch = useDispatch<AppDispatch>();
    const GoodsReceiptNotes = useSelector((state: RootState) => state.goodsReceiptNotes.GoodsReceiptNotes);
    const loading = useSelector((state: RootState) => state.goodsReceiptNotes.loading);
    const error = useSelector((state: RootState) => state.goodsReceiptNotes.error);

    const loadGoodsReceiptNote = () => dispatch(fetchGoodsReceiptNote());
    
    const saveGoodsReceiptNote = (GoodsReceiptNote: GoodsReceiptNote): Promise<{ success: boolean; message?: string }> =>
           new Promise((resolve, reject) => {
             dispatch(addOrUpdateGoodsReceiptNote(GoodsReceiptNote))
               .then((action) => {
                 if (action.type === GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_SUCCESS) {
                   resolve({ success: true, message: "" });
                 } else if (action.type === GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_FAILURE) {
                   resolve({ success: false, message: action.payload || "Failed to save Transaction Type." });
                 }
               })
               .catch((error) => {
                 reject({
                   success: false,
                   message: error instanceof Error ? error.message : "An error occurred while save TransactionType.",
                 });
               });
           });

    const deleteGoodsReceiptNote = (GoodsReceiptNoteTypeCode: string):Promise<{ success: boolean; message?: string }> =>
         new Promise((resolve, reject) => {
             dispatch(removeGoodsReceiptNote(GoodsReceiptNoteTypeCode))
               .then((action) => {
                 if (action.type === GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_SUCCESS) {
                   resolve({ success: true, message: "OK" });
                 } else if (action.type === GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_FAILURE) {
                   resolve({ success: false, message: action.payload || "Failed to save Transaction Type." });
                 }
               })
               .catch((error) => {
                 reject({
                   success: false,
                   message: error instanceof Error ? error.message : "An error occurred while save TransactionType.",
                 });
               });
           });

    return {
        GoodsReceiptNotes,
        loading,
        error,
        loadGoodsReceiptNote,
        saveGoodsReceiptNote,
        deleteGoodsReceiptNote
    }
}

