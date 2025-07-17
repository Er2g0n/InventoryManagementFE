import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";
import { DeleteGoodsReceiptNoteFailure, DeleteGoodsReceiptNoteSuccess, FetchGoodsReceiptNoteFailure, FetchGoodsReceiptNoteRequest, FetchGoodsReceiptNoteSucess, GoodsReceiptNoteAction, GoodsReceiptNoteActionTypes, SaveGoodsReceiptNoteFailure, SaveGoodsReceiptNoteRequest, SaveGoodsReceiptNoteSuccess } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { GoodsReceiptNote_GetAll, GoodsReceiptNoteCode_Delete, GoodsReceiptNoteCode_Save } from "@features/Inventory/Services/ReceiptService";

export const fetchGoodsReceiptNoteRequest = (): FetchGoodsReceiptNoteRequest => ({
    type: GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_REQUEST
});

export const fetchGoodsReceiptNoteSuccess = (
    GoodsReceiptNotes: GoodsReceiptNote[]
): FetchGoodsReceiptNoteSucess => ({
    type: GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_SUCCESS,
    payload: GoodsReceiptNotes,
})

export const fetchGoodsReceiptNoteFailure = (
    error: string
): FetchGoodsReceiptNoteFailure => ({
    type: GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_FAILURE,
    payload: error
})


export const saveGoodsReceiptNoteRequest = (): SaveGoodsReceiptNoteRequest => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_REQUEST,
});

export const saveGoodsReceiptNoteSuccess = (
    GoodsReceiptNote: GoodsReceiptNote
): SaveGoodsReceiptNoteSuccess => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_SUCCESS,
    payload: GoodsReceiptNote,
});

export const saveGoodsReceiptNoteFailure = (
    error: string
): SaveGoodsReceiptNoteFailure => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_FAILURE,
    payload: error,
});


export const deleteGoodsReceiptNoteSuccess = (
    GoodsReceiptNoteCode: string
): DeleteGoodsReceiptNoteSuccess => ({
    type: GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_SUCCESS,
    payload: GoodsReceiptNoteCode,
});
export const deleteGoodsReceiptNoteFailure = (
    error: string
): DeleteGoodsReceiptNoteFailure => ({
    type: GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_FAILURE,
    payload: error,
});

export const fetchGoodsReceiptNote = (): ThunkAction<
void,
RootState,
unknown,
GoodsReceiptNoteAction
> => async (dispath) =>{
    dispath(fetchGoodsReceiptNoteRequest());
    try{
        const response = await GoodsReceiptNote_GetAll();
        if(response.code === 'Success' && response.data){
            dispath(fetchGoodsReceiptNoteSuccess(response.data));
        }
        else{
            dispath(fetchGoodsReceiptNoteFailure(response.message || 'Failed to get data'))
        }
    }catch(error){
        dispath(fetchGoodsReceiptNoteFailure(error instanceof Error? error.message : "Failed to fetch"))
    }
}


export const addOrUpdateGoodsReceiptNote = (
  GoodsReceiptNote: GoodsReceiptNote
): ThunkAction<void, RootState, unknown, GoodsReceiptNoteAction> => async (dispatch) => {
  dispatch(saveGoodsReceiptNoteRequest());
  try {
    const response = await GoodsReceiptNoteCode_Save(GoodsReceiptNote);
    if (response.code === 'Success' && response.data) {
      dispatch(saveGoodsReceiptNoteSuccess(response.data));
    } else {
      dispatch(saveGoodsReceiptNoteFailure(response.message || 'Failed to save'));
    }
  } catch (error) {
    dispatch(saveGoodsReceiptNoteFailure(error instanceof Error ? error.message : 'Failed to save'));
  }
};

export const removeGoodsReceiptNote = (
  GoodsReceiptNoteCode: string
): ThunkAction<void, RootState, unknown, GoodsReceiptNoteAction> => async (dispatch) => {
  try {
    const response = await GoodsReceiptNoteCode_Delete(GoodsReceiptNoteCode);
    if (response.code === "0") {
      dispatch(deleteGoodsReceiptNoteSuccess(GoodsReceiptNoteCode));
    } else {
      dispatch(deleteGoodsReceiptNoteFailure(response.message || 'Failed to delete'));
    }
  } catch (error) {
    dispatch(deleteGoodsReceiptNoteFailure(error instanceof Error ? error.message : 'Failed to delete'));
  }
};