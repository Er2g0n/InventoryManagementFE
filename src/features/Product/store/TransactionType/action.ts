import { TransactionType } from "@/types/MasterData/TransactionType";
import { DeleteTransactionTypeFailure, DeleteTransactionTypeSuccess, FetchTransactionTypeFailure, FetchTransactionTypeRequest, FetchTransactionTypeSuccess, SaveTransactionTypeFailure, SaveTransactionTypeRequest, SaveTransactionTypeSuccess, TransactionTypeAction, TransactionTypeActionTypes } from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "@/store/store";
import { TransactionType_Delete, TransactionType_GetAll, TransactionType_Save } from "@features/Product/Services/TransactionTypeService";

export const fetchTransactionTypeRequest = (): FetchTransactionTypeRequest => ({
    type: TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_REQUEST
});

export const fetchTransactionTypeSuccess = (
    productCategories: TransactionType[]
): FetchTransactionTypeSuccess => ({
    type: TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_SUCCESS,
    payload: productCategories,
});

export const fetchTransactionTypeFailure = (
    error: string
): FetchTransactionTypeFailure => ({
    type: TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_FAILURE,
    payload: error,
});


export const saveTransactionTypeRequest = (): SaveTransactionTypeRequest => ({
    type: TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_REQUEST,
});

export const saveTransactionTypeSuccess = (
    TransactionType: string
): SaveTransactionTypeSuccess => ({
    type: TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_SUCCESS,
    payload: TransactionType,
});

export const saveTransactionTypeFailure = (
    error: string
): SaveTransactionTypeFailure => ({
    type: TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_FAILURE,
    payload: error,
});


export const deleteTransactionTypeSuccess = (
    transactionTypeCode: string
): DeleteTransactionTypeSuccess => ({
    type: TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_SUCCESS,
    payload: transactionTypeCode,
});
export const deleteTransactionTypeFailure = (
    error: string
): DeleteTransactionTypeFailure => ({
    type: TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_FAILURE,
    payload: error,
});


export const fetchTransactionTypes = (): ThunkAction<
    void,
    RootState,
    unknown,
    TransactionTypeAction
> => async (dispatch) => {
    dispatch(fetchTransactionTypeRequest());
    try {
        const response = await TransactionType_GetAll();
        if (response.code == '0' && response.data) {
          const rs = response.data.sort((a: TransactionType, b: TransactionType)=> a.transactionTypeCode.localeCompare(b.transactionTypeCode))
            dispatch(fetchTransactionTypeSuccess(rs));
        } else {
            dispatch(fetchTransactionTypeFailure(response.message || 'Failed to fetch'))
        }
    } catch (error) {
        dispatch(fetchTransactionTypeFailure(error instanceof Error ? error.message : 'Failed to fetch'))
    }
}

export const addOrUpdateTransactionType = (
  TransactionType: TransactionType
): ThunkAction<Promise<TransactionTypeAction>, RootState, unknown, TransactionTypeAction> => async (dispatch) => {
  dispatch(saveTransactionTypeRequest());
  try {
    const response = await TransactionType_Save(TransactionType);
    if (response.code === 'Success') {
      return dispatch(saveTransactionTypeSuccess(response.message));
    } else {
     return dispatch(saveTransactionTypeFailure(response.message || 'Failed to save'));
    }
  } catch (error) {
    return dispatch(saveTransactionTypeFailure(error instanceof Error ? error.message : 'Failed to save'));
  }
};

export const removeTransactionType = (
  transactionTypeCode: string
): ThunkAction<Promise<TransactionTypeAction>, RootState, unknown, TransactionTypeAction> => async (dispatch) => {
  try {
    const response = await TransactionType_Delete(transactionTypeCode);
    if (response.code === "0") {
       return dispatch(deleteTransactionTypeSuccess(transactionTypeCode));
        } 
        else {
          return  dispatch(deleteTransactionTypeFailure(response.message || "Failed to delete"));
    }
  } catch (error) {
    return dispatch(deleteTransactionTypeFailure(error instanceof Error ? error.message : 'Failed to delete'));
  }
};