import { UnitOfMeasure } from "@/types/MasterData/Product/ProductProperties";
import { FetchUoMFailure, FetchUoMRequest, FetchUoMSuccess, UoMAction, UoMActionTypes } from "./types";
import { ResultService } from "@/types/Base/ResultService";
import { RootState } from "@/store/store";
import { ThunkAction } from "redux-thunk";
import { deleteUoM, getAllUoM, saveUoM } from "@features/Product/Services/UoMService";

export const fetchUoMRequest = (): FetchUoMRequest => ({
    type: UoMActionTypes.FETCH_UOM_REQUEST,
});
export const fetchUoMSuccess = (uoMList: UnitOfMeasure[]): FetchUoMSuccess => ({
    type: UoMActionTypes.FETCH_UOM_SUCCESS,
    payload: uoMList,
});
export const fetchUoMFailure = (error: string): FetchUoMFailure => ({
    type: UoMActionTypes.FETCH_UOM_FAILURE,
    payload: error,
});

export const saveUoMRequest = (): { type: UoMActionTypes.SAVE_UOM_REQUEST } => ({
    type: UoMActionTypes.SAVE_UOM_REQUEST,
});
export const saveUoMSuccess = (response: ResultService<UnitOfMeasure>): { type: UoMActionTypes.SAVE_UOM_SUCCESS; payload: ResultService<UnitOfMeasure> } => ({
    type: UoMActionTypes.SAVE_UOM_SUCCESS,
    payload: response,
});
export const saveUoMFailure = (error: string): { type: UoMActionTypes.SAVE_UOM_FAILURE; payload: string } => ({
    type: UoMActionTypes.SAVE_UOM_FAILURE,
    payload: error,
});

export const deleteUoMSuccess = (uoMCode: string): { type: UoMActionTypes.DELETE_UOM_SUCCESS; payload: string } => ({
    type: UoMActionTypes.DELETE_UOM_SUCCESS,
    payload: uoMCode,
});
export const deleteUoMFailure = (error: string): { type: UoMActionTypes.DELETE_UOM_FAILURE; payload: string } => ({
    type: UoMActionTypes.DELETE_UOM_FAILURE,
    payload: error,
});

export const fetchUoMs = (): ThunkAction<
  Promise<UoMAction>,
  RootState,
  unknown,
  UoMAction
> => async (dispatch) => {
  dispatch(fetchUoMRequest());
  try {
    const response = await getAllUoM();
    if (response.code === "0" && response.data) {
      const successAction = fetchUoMSuccess(response.data);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = fetchUoMFailure(response.message || 'Failed to fetch product types');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = fetchUoMFailure(
      error instanceof Error ? error.message : 'Failed to fetch product types'
    );
    dispatch(failureAction);
    return failureAction;
  }
};

export const saveUoMAction = (
  uoM: UnitOfMeasure
): ThunkAction<Promise<UoMAction>, RootState, unknown, UoMAction> => async (dispatch) => {
  dispatch(saveUoMRequest());
  try {
    const response = await saveUoM(uoM);
    if (response.code === "0" && response.data) {
      const successAction = saveUoMSuccess(response);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = saveUoMFailure(response.message || 'Failed to save unit of measure');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = saveUoMFailure(
      error instanceof Error ? error.message : 'Failed to save unit of measure'
    );
    dispatch(failureAction);
    return failureAction;
  }
};

export const deleteUoMAction = (
  uoMCode: string
): ThunkAction<Promise<UoMAction>, RootState, unknown, UoMAction> => async (dispatch) => {
  try {
    const response = await deleteUoM(uoMCode);
    if (response.code === "0") {
      const successAction = deleteUoMSuccess(uoMCode);
      dispatch(successAction);
      return successAction;
    } else {
      const failureAction = deleteUoMFailure(response.message || 'Failed to delete unit of measure');
      dispatch(failureAction);
      return failureAction;
    }
  } catch (error) {
    const failureAction = deleteUoMFailure(
      error instanceof Error ? error.message : 'Failed to delete unit of measure'
    );
    dispatch(failureAction);
    return failureAction;
  }
};