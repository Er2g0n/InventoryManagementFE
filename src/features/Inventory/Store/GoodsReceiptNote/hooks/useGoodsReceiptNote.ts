import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { addOrUpdateGoodsReceiptNote, fetchGoodsReceiptNote, removeGoodsReceiptNote } from "../action";
import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";

export const useGoodsReceiptNote = () => {
    const dispatch = useDispatch<AppDispatch>();
    const GoodsReceiptNotes = useSelector((state: RootState) => state.goodsReceiptNotes.GoodsReceiptNotes);
    const loading = useSelector((state: RootState) => state.goodsReceiptNotes.loading);
    const error = useSelector((state: RootState) => state.goodsReceiptNotes.error);

    const loadGoodsReceiptNote = () => dispatch(fetchGoodsReceiptNote());
    const saveGoodsReceiptNote = (GoodsReceiptNote: GoodsReceiptNote) =>
        dispatch(addOrUpdateGoodsReceiptNote(GoodsReceiptNote));
    const deleteGoodsReceiptNote = (GoodsReceiptNoteTypeCode: string) =>
        dispatch(removeGoodsReceiptNote(GoodsReceiptNoteTypeCode));

    return {
        GoodsReceiptNotes,
        loading,
        error,
        loadGoodsReceiptNote,
        saveGoodsReceiptNote,
        deleteGoodsReceiptNote
    }
}

