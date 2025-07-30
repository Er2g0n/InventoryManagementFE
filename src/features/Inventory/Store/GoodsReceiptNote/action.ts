import { GoodsReceiptNote, GoodsReceiptNote_Param, GoodsReceiptNoteLine } from "@/types/WarehouseManagement/GoodsReceiptNote";
import { DeleteGoodsReceiptNoteFailure, DeleteGoodsReceiptNoteLineFailure, DeleteGoodsReceiptNoteLineSuccess, DeleteGoodsReceiptNoteSuccess, FetchGoodsReceiptNoteFailure, FetchGoodsReceiptNoteLineFailure, FetchGoodsReceiptNoteLineRequest, FetchGoodsReceiptNoteLineSucess, FetchGoodsReceiptNoteRequest, FetchGoodsReceiptNoteSucess, GoodsReceiptNote_Line_ActionTypes, GoodsReceiptNoteAction, GoodsReceiptNoteActionTypes, GoodsReceiptNoteLineAction, SaveGoodsReceiptNote_Param_Failure, SaveGoodsReceiptNote_Param_Request, SaveGoodsReceiptNote_Param_Success, SaveGoodsReceiptNoteFailure, SaveGoodsReceiptNoteRequest, SaveGoodsReceiptNoteSuccess } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { GoodsReceiptNote_GetAll, GoodsReceiptNoteCode_DeleteHeaderAndDetail, GoodsReceiptNoteCode_Save, GoodsReceiptNoteLine_Delete_ByCode, GoodsReceiptNoteLine_Get_ByGRNCode, GoodsReceiptNoteLine_Save_HeaderAndLine } from "@features/Inventory/Services/ReceiptService";

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

export const fetchGoodsReceiptNoteLineRequest = (): FetchGoodsReceiptNoteLineRequest => ({
    type: GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_REQUEST
});

export const fetchGoodsReceiptNoteLineSuccess = (
    GoodsReceiptNoteLine: GoodsReceiptNoteLine[]
): FetchGoodsReceiptNoteLineSucess => ({
    type: GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_SUCCESS,
    payload: GoodsReceiptNoteLine,
})

export const fetchGoodsReceiptNoteLineFailure = (
    error: string
): FetchGoodsReceiptNoteLineFailure => ({
    type: GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_FAILURE,
    payload: error
})

export const saveGoodsReceiptNoteRequest = (): SaveGoodsReceiptNoteRequest => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_REQUEST,
});

export const saveGoodsReceiptNoteSuccess = (
    GoodsReceiptNote: GoodsReceiptNote,
): SaveGoodsReceiptNoteSuccess => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_SUCCESS,
    payload: GoodsReceiptNote,
});

export const saveGoodsReceiptNoteFailure = (
    error: string,
): SaveGoodsReceiptNoteFailure => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_FAILURE,
    payload: error,
});

// Save Goods ReceiptNote_Param
export const saveGoodsReceiptNote_Param_Request = (): SaveGoodsReceiptNote_Param_Request => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_REQUEST,
});

export const saveGoodsReceiptNote_Param_Success = (
    GoodsReceiptNote_Param: GoodsReceiptNote_Param,
): SaveGoodsReceiptNote_Param_Success => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_SUCCESS,
    payload: GoodsReceiptNote_Param,
});

export const saveGoodsReceiptNote_Param_Failure = (
    error: string,
): SaveGoodsReceiptNote_Param_Failure => ({
    type: GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_PARAM_FAILURE,
    payload: error,
});

export const deleteGoodsReceiptNoteSuccess = (
    GoodsReceiptNoteCode: string,
): DeleteGoodsReceiptNoteSuccess => ({
    type: GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_SUCCESS,
    payload: GoodsReceiptNoteCode
});
export const deleteGoodsReceiptNoteFailure = (
    error: string,
): DeleteGoodsReceiptNoteFailure => ({
    type: GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_FAILURE,
    payload: error,
});

export const deleteGoodsReceiptNote_Line_Success = (
    rowPointer: string,
): DeleteGoodsReceiptNoteLineSuccess => ({
    type: GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_SUCCESS,
    payload: rowPointer
});
export const deleteGoodsReceiptNote_Line_Failure = (
    error: string,
): DeleteGoodsReceiptNoteLineFailure => ({
    type: GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_FAILURE,
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
            dispath(fetchGoodsReceiptNoteSuccess(response.data.filter(x=>x.grnCode)));
        }
        else{
            dispath(fetchGoodsReceiptNoteFailure(response.message || 'Failed to get data'))
        }
    }catch(error){
        dispath(fetchGoodsReceiptNoteFailure(error instanceof Error? error.message : "Failed to fetch"))
    }
}

export const fetchGoodsReceiptNoteLine = (GoodsReceiptNoteCode: string): ThunkAction<
void,
RootState,
unknown,
GoodsReceiptNoteLineAction
> => async (dispath) =>{
    dispath(fetchGoodsReceiptNoteLineRequest());
    try{
        const response = await GoodsReceiptNoteLine_Get_ByGRNCode(GoodsReceiptNoteCode);
        if(response.code === 'Success' && response.data){
            return dispath(fetchGoodsReceiptNoteLineSuccess(response.data.filter(x=>x.refGRNCode)));
        }
        else{
            return dispath(fetchGoodsReceiptNoteLineFailure(response.message || 'Failed to get data'))
        }
    }catch(error){
       return dispath(fetchGoodsReceiptNoteLineFailure(error instanceof Error? error.message : "Failed to fetch"))
    }
}

export const addOrUpdateGoodsReceiptNote = (
  GoodsReceiptNote: GoodsReceiptNote,
): ThunkAction<Promise<GoodsReceiptNoteAction>, RootState, unknown, GoodsReceiptNoteAction> => async (dispatch) => {
  dispatch(saveGoodsReceiptNoteRequest());
  try {
    const response = await GoodsReceiptNoteCode_Save(GoodsReceiptNote);
    if (response.code === 'Success' && response.data) {
      return dispatch(saveGoodsReceiptNoteSuccess(response.data));
    } else {
      return dispatch(saveGoodsReceiptNoteFailure(response.message || 'Failed to save'));
    }
  } catch (error) {
    return dispatch(saveGoodsReceiptNoteFailure(error instanceof Error ? error.message : 'Failed to save'));
  }
};

// Save Goods ReceiptNote Param
export const addOrUpdateGoodsReceiptNote_Param = (
  GoodsReceiptNote: GoodsReceiptNote_Param,
): ThunkAction<Promise<GoodsReceiptNoteAction>, RootState, unknown, GoodsReceiptNoteAction> => async (dispatch) => {
  dispatch(saveGoodsReceiptNote_Param_Request());
  try {
    const response = await GoodsReceiptNoteLine_Save_HeaderAndLine(GoodsReceiptNote);
    if (response.code === 'Success' && response.data) {
      return dispatch(saveGoodsReceiptNote_Param_Success(response.data));
    } else {
      return dispatch(saveGoodsReceiptNote_Param_Failure(response.message || 'Failed to save'));
    }
  } catch (error) {
    return dispatch(saveGoodsReceiptNote_Param_Failure(error instanceof Error ? error.message : 'Failed to save'));
  }
};

export const removeGoodsReceiptNote = (
  GoodsReceiptNoteCode: string
): ThunkAction<Promise<GoodsReceiptNoteAction>, RootState, unknown, GoodsReceiptNoteAction> => async (dispatch) => {
  try {
    const response = await GoodsReceiptNoteCode_DeleteHeaderAndDetail(GoodsReceiptNoteCode);
    if (response.code === 'Success') {
      return dispatch(deleteGoodsReceiptNoteSuccess(GoodsReceiptNoteCode));
    } else {
      return dispatch(deleteGoodsReceiptNoteFailure(response.message || 'Failed to delete'));
    }
  } catch (error) {
    return dispatch(deleteGoodsReceiptNoteFailure(error instanceof Error ? error.message : 'Failed to delete'));
  }
};

export const removeGoodsReceiptNote_Line = (
  rowPointer: string
): ThunkAction<Promise<GoodsReceiptNoteLineAction>, RootState, unknown, GoodsReceiptNoteLineAction> => async (dispatch) => {
  try {
    const response = await GoodsReceiptNoteLine_Delete_ByCode(rowPointer);
    if (response.code === 'Success') {
      return dispatch(deleteGoodsReceiptNote_Line_Success(rowPointer));
    } else {
      return dispatch(deleteGoodsReceiptNote_Line_Failure(response.message || 'Failed to delete'));
    }
  } catch (error) {
    return dispatch(deleteGoodsReceiptNote_Line_Failure(error instanceof Error ? error.message : 'Failed to delete'));
  }
};