import { GoodsReceiptNote, GoodsReceiptNoteLine } from "@/types/WarehouseManagement/GoodsReceiptNote";

export interface GoodsReceiptNoteState {
    GoodsReceiptNotes: GoodsReceiptNote[];
    GoodsReceiptNoteLine: GoodsReceiptNoteLine[];
    loading: boolean;
    error: string | null;
}

export enum GoodsReceiptNoteActionTypes {
    //Get All GoodsReceiptNote
    FETCH_GOODS_RECEIPT_NOTE_REQUEST = 'GoodsReceiptNote/FETCH_GOODS_RECEIPT_NOTE_REQUEST',
    FETCH_GOODS_RECEIPT_NOTE_SUCCESS = 'GoodsReceiptNote/FETCH_GOODS_RECEIPT_NOTE_SUCCESS',
    FETCH_GOODS_RECEIPT_NOTE_FAILURE = 'GoodsReceiptNote/FETCH_GOODS_RECEIPT_NOTE_FAILURE',

    //save: create or update
    SAVE_GOODS_RECEIPT_NOTE_REQUEST = 'GoodsReceiptNote/SAVE_GOODS_RECEIPT_NOTE_REQUEST',
    SAVE_GOODS_RECEIPT_NOTE_SUCCESS = 'GoodsReceiptNote/SAVE_GOODS_RECEIPT_NOTE_SUCCESS',
    SAVE_GOODS_RECEIPT_NOTE_FAILURE = 'GoodsReceiptNote/SAVE_GOODS_RECEIPT_NOTE_FAILURE',

    //delete
    DELETE_GOODS_RECEIPT_NOTE_SUCCESS = 'GoodsReceiptNote/DELETE_GOODS_RECEIPT_NOTE_SUCCESS',
    DELETE_GOODS_RECEIPT_NOTE_FAILURE = 'GoodsReceiptNote/DELETE_GOODS_RECEIPT_NOTE_FAILURE',
}

export interface FetchGoodsReceiptNoteRequest {
    type: typeof GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_REQUEST
}

export interface FetchGoodsReceiptNoteSucess {
    type: typeof GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_SUCCESS;
    payload: GoodsReceiptNote[];
}

export interface FetchGoodsReceiptNoteFailure {
    type: typeof GoodsReceiptNoteActionTypes.FETCH_GOODS_RECEIPT_NOTE_FAILURE;
    payload: string;
}

export interface SaveGoodsReceiptNoteRequest {
    type: typeof GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_REQUEST;
}

export interface SaveGoodsReceiptNoteSuccess {
    type: typeof GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_SUCCESS,
    payload: GoodsReceiptNote;
}

export interface SaveGoodsReceiptNoteFailure {
    type: typeof GoodsReceiptNoteActionTypes.SAVE_GOODS_RECEIPT_NOTE_FAILURE,
    payload: string;
}

export interface DeleteGoodsReceiptNoteSuccess {
    type: typeof GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_SUCCESS,
    payload: string;
}

export interface DeleteGoodsReceiptNoteFailure {
    type: typeof GoodsReceiptNoteActionTypes.DELETE_GOODS_RECEIPT_NOTE_FAILURE,
    payload: string;
}

export type GoodsReceiptNoteAction =
    | FetchGoodsReceiptNoteRequest
    | FetchGoodsReceiptNoteSucess
    | FetchGoodsReceiptNoteFailure

    | SaveGoodsReceiptNoteRequest
    | SaveGoodsReceiptNoteSuccess
    | SaveGoodsReceiptNoteFailure

    | DeleteGoodsReceiptNoteSuccess
    | DeleteGoodsReceiptNoteFailure

    
export interface GoodsReceiptNoteLineState {
    GoodsReceiptNoteLines: GoodsReceiptNoteLine[];
    loading: boolean;
    error: string | null;
}

export enum GoodsReceiptNote_Line_ActionTypes {
    //Get All GoodsReceiptNote
    FETCH_GOODS_RECEIPT_NOTE_LINE_REQUEST = 'GoodsReceiptNoteLine/FETCH_GOODS_RECEIPT_NOTE_LINE_REQUEST',
    FETCH_GOODS_RECEIPT_NOTE_LINE_SUCCESS = 'GoodsReceiptNoteLine/FETCH_GOODS_RECEIPT_NOTE_LINE_SUCCESS',
    FETCH_GOODS_RECEIPT_NOTE_LINE_FAILURE = 'GoodsReceiptNoteLine/FETCH_GOODS_RECEIPT_NOTE_LINE_FAILURE',

    //save: create or update
    SAVE_GOODS_RECEIPT_NOTE_LINE_REQUEST = 'GoodsReceiptNoteLine/SAVE_GOODS_RECEIPT_NOTE_LINE_REQUEST',
    SAVE_GOODS_RECEIPT_NOTE_LINE_SUCCESS = 'GoodsReceiptNoteLine/SAVE_GOODS_RECEIPT_NOTE_LINE_SUCCESS',
    SAVE_GOODS_RECEIPT_NOTE_LINE_FAILURE = 'GoodsReceiptNoteLine/SAVE_GOODS_RECEIPT_NOTE_LINE_FAILURE',

    //delete
    DELETE_GOODS_RECEIPT_NOTE_LINE_SUCCESS = 'GoodsReceiptNoteLine/DELETE_GOODS_RECEIPT_NOTE_LINE_SUCCESS',
    DELETE_GOODS_RECEIPT_NOTE_LINE_FAILURE = 'GoodsReceiptNoteLine/DELETE_GOODS_RECEIPT_NOTE_LINE_FAILURE',
}

export interface FetchGoodsReceiptNoteLineRequest {
    type: typeof GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_REQUEST
}

export interface FetchGoodsReceiptNoteLineSucess {
    type: typeof GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_SUCCESS;
    payload: GoodsReceiptNoteLine[];
}

export interface FetchGoodsReceiptNoteLineFailure {
    type: typeof GoodsReceiptNote_Line_ActionTypes.FETCH_GOODS_RECEIPT_NOTE_LINE_FAILURE;
    payload: string;
}

export interface SaveGoodsReceiptNoteLineRequest {
    type: typeof GoodsReceiptNote_Line_ActionTypes.SAVE_GOODS_RECEIPT_NOTE_LINE_REQUEST;
}

export interface SaveGoodsReceiptNoteLineSuccess {
    type: typeof GoodsReceiptNote_Line_ActionTypes.SAVE_GOODS_RECEIPT_NOTE_LINE_SUCCESS,
    payload: GoodsReceiptNote;
}

export interface SaveGoodsReceiptNoteLineFailure {
    type: typeof GoodsReceiptNote_Line_ActionTypes.SAVE_GOODS_RECEIPT_NOTE_LINE_FAILURE,
    payload: string;
}

export interface DeleteGoodsReceiptNoteLineSuccess {
    type: typeof GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_SUCCESS,
    payload: string;
}

export interface DeleteGoodsReceiptNoteLineFailure {
    type: typeof GoodsReceiptNote_Line_ActionTypes.DELETE_GOODS_RECEIPT_NOTE_LINE_FAILURE,
    payload: string;
}

export type GoodsReceiptNoteLineAction =
    | FetchGoodsReceiptNoteLineRequest
    | FetchGoodsReceiptNoteLineSucess
    | FetchGoodsReceiptNoteLineFailure

    | SaveGoodsReceiptNoteLineRequest
    | SaveGoodsReceiptNoteLineSuccess
    | SaveGoodsReceiptNoteLineFailure

    | DeleteGoodsReceiptNoteLineSuccess
    | DeleteGoodsReceiptNoteLineFailure