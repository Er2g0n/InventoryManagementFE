import { Color } from "@/types/MasterData/Product/ProductProperties";

export interface ColorState {
    colors: Color[];
    loading: boolean;
    error: string | null;
}

export enum ColorActionTypes {
    FETCH_COLORS_REQUEST = 'color/FETCH_COLORS_REQUEST',
    FETCH_COLORS_SUCCESS = 'color/FETCH_COLORS_SUCCESS',
    FETCH_COLORS_FAILURE = 'color/FETCH_COLORS_FAILURE',

    SAVE_COLOR_REQUEST = 'color/SAVE_COLOR_REQUEST',
    SAVE_COLOR_SUCCESS = 'color/SAVE_COLOR_SUCCESS',
    SAVE_COLOR_FAILURE = 'color/SAVE_COLOR_FAILURE',

    DELETE_COLOR_SUCCESS = 'color/DELETE_COLOR_SUCCESS',
    DELETE_COLOR_FAILURE = 'color/DELETE_COLOR_FAILURE',
}

export interface FetchColorsRequest {
    type: typeof ColorActionTypes.FETCH_COLORS_REQUEST;
}
export interface FetchColorsSuccess {
    type: typeof ColorActionTypes.FETCH_COLORS_SUCCESS;
    payload: Color[];
}
export interface FetchColorsFailure {
    type: typeof ColorActionTypes.FETCH_COLORS_FAILURE;
    payload: string;
}


export interface SaveColorRequest {
    type: typeof ColorActionTypes.SAVE_COLOR_REQUEST;
}
export interface SaveColorSuccess {
    type: typeof ColorActionTypes.SAVE_COLOR_SUCCESS;
    payload: string;
}
export interface SaveColorFailure {
    type: typeof ColorActionTypes.SAVE_COLOR_FAILURE;
    payload: string;
}


export interface DeleteColorSuccess {
    type: typeof ColorActionTypes.DELETE_COLOR_SUCCESS;
    payload: string;
}
export interface DeleteColorFailure {
    type: typeof ColorActionTypes.DELETE_COLOR_FAILURE;
    payload: string;
}

export type ColorAction =
    | FetchColorsRequest
    | FetchColorsSuccess
    | FetchColorsFailure
    | SaveColorRequest
    | SaveColorSuccess
    | SaveColorFailure
    | DeleteColorSuccess
    | DeleteColorFailure;
