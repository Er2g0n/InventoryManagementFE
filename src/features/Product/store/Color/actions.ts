import { DeleteColorFailure, DeleteColorSuccess, FetchColorsFailure, FetchColorsRequest, FetchColorsSuccess, ColorAction, ColorActionTypes, SaveColorFailure, SaveColorRequest, SaveColorSuccess } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { Color } from "@/types/MasterData/Product/ProductProperties";
import { deleteColor, getAllColor, saveColor } from "@features/Product/Services/ProductColorService";

export const fetchColorsRequest = (): FetchColorsRequest => ({
  type: ColorActionTypes.FETCH_COLORS_REQUEST,
});
export const fetchColorsSuccess = (
  colors: Color[]
): FetchColorsSuccess => ({
  type: ColorActionTypes.FETCH_COLORS_SUCCESS,
  payload: colors,
});

export const fetchColorsFailure = (error: string): FetchColorsFailure => ({
  type: ColorActionTypes.FETCH_COLORS_FAILURE,
  payload: error,
});

export const saveColorRequest = (): SaveColorRequest => ({
  type: ColorActionTypes.SAVE_COLOR_REQUEST,
});

export const saveColorSuccess = (
  message: string
): SaveColorSuccess => ({
  type: ColorActionTypes.SAVE_COLOR_SUCCESS,
  payload: message,
});
export const saveColorFailure = (error: string): SaveColorFailure => ({
  type: ColorActionTypes.SAVE_COLOR_FAILURE,
  payload: error,
});

export const deleteColorSuccess = (message: string): DeleteColorSuccess => ({
  type: ColorActionTypes.DELETE_COLOR_SUCCESS,
  payload: message,
});

export const deleteColorFailure = (error: string): DeleteColorFailure => ({
  type: ColorActionTypes.DELETE_COLOR_FAILURE,
  payload: error,
});

export const fetchColors = (): ThunkAction<Promise<ColorAction>, RootState, unknown, ColorAction> => async (dispatch) => {
  dispatch(fetchColorsRequest());
  try {
    const response = await getAllColor();
    if (response.code === "0" && response.data) {
      const successAction = fetchColorsSuccess(response.data);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = fetchColorsFailure(response.message || "Failed to fetch colors.");
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = fetchColorsFailure(
      error instanceof Error ? error.message : "An error occurred while fetching colors."
    );
    dispatch(failureAction);
    return failureAction;
  }
};

export const addOrUpdateColor = (
  color: Color
): ThunkAction<Promise<ColorAction>, RootState, unknown, ColorAction> => async (dispatch) => {
  dispatch(saveColorRequest());
  try {
    const response = await saveColor(color);
    if (response.code == "0") {
      const successAction = saveColorSuccess(response.message);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = saveColorFailure(response.message || "Failed to save color.");
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = saveColorFailure(
      error instanceof Error ? error.message : "An error occurred while saving color."
    );
    dispatch(failureAction);
    return failureAction;
  }
};

export const removeColor = (
  colorCode: string
): ThunkAction<Promise<ColorAction>, RootState, unknown, ColorAction> => async (dispatch) => {
  try {
    const response = await deleteColor(colorCode);
    if (response.code === "0") {
      const successAction = deleteColorSuccess(response.message);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = deleteColorFailure(response.message || "Failed to delete color.");
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = deleteColorFailure(
      error instanceof Error ? error.message : "An error occurred while deleting color."
    );
    dispatch(failureAction);
    return failureAction;
  }
};
