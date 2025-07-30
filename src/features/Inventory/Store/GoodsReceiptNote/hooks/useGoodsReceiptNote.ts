import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { addOrUpdateGoodsReceiptNote, fetchGoodsReceiptNote, fetchGoodsReceiptNoteLine, removeGoodsReceiptNote, removeGoodsReceiptNote_Line,addOrUpdateGoodsReceiptNote_Param } from "../action";
import { GoodsReceiptNote, GoodsReceiptNote_Param } from "@/types/WarehouseManagement/GoodsReceiptNote";
import { GoodsReceiptNote_Line_ActionTypes, GoodsReceiptNoteActionTypes } from "../types";

export const useGoodsReceiptNote = () => {
  const dispatch = useDispatch<AppDispatch>();
  const GoodsReceiptNotes = useSelector((state: RootState) => state.goodsReceiptNotes.GoodsReceiptNotes);
  var GoodsReceiptNoteLines = useSelector((state: RootState) => state.goodsReceiptNotes.GoodsReceiptNoteLine);
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

const saveGoodsReceiptNote_Param = (GoodsReceiptNote_Param: GoodsReceiptNote_Param): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(addOrUpdateGoodsReceiptNote_Param(GoodsReceiptNote_Param))
        .then((action) => {
          if (action.type === GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_SUCCESS) {
             return resolve({ success: true, message: "OK" });
          } else if (action.type === GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_FAILURE) {
            return resolve({ success: false, message: action.payload || "Failed to save Transaction Type." });
          }
        })
        .catch((error) => {
          return reject({
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while save TransactionType.",
          });
        });
    });

  const deleteGoodsReceiptNote = (GoodsReceiptNoteTypeCode: string): Promise<{ success: boolean; message?: string }> =>
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

    const deleteGoodsReceiptNoteLine = (rowPointer: string): Promise<{ success: boolean; message?: string }> =>
    new Promise((resolve, reject) => {
      dispatch(removeGoodsReceiptNote_Line(rowPointer))
        .then((action) => {
          if (action.type === GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_SUCCESS) {
            resolve({ success: true, message: "OK" });
          } else if (action.type === GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_FAILURE) {
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


  const loadGoodsReceiptNoteLine = (GRNCode: string) => {dispatch(fetchGoodsReceiptNoteLine(GRNCode))};
  const ClearGoodsReceiptNoteLine = () => { GoodsReceiptNoteLines = [] };
  return {
    GoodsReceiptNotes,
    GoodsReceiptNoteLines,
    loading,
    error,
    loadGoodsReceiptNote,
    saveGoodsReceiptNote,
    saveGoodsReceiptNote_Param,
    deleteGoodsReceiptNote,
    loadGoodsReceiptNoteLine,
    ClearGoodsReceiptNoteLine,
    deleteGoodsReceiptNoteLine
  }
}

