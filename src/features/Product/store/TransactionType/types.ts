import { TransactionType } from "@/types/MasterData/TransactionType";

export interface TransactionTypeState{
    transactionTypes: TransactionType[];
    loading:boolean;
    error: string | null;
}

export enum TransactionTypeActionTypes{
    //get
  FETCH_TRANSACTION_TYPE_REQUEST = 'transactionType/FETCH_TRANSACTION_TYPE_REQUEST',
  FETCH_TRANSACTION_TYPE_SUCCESS = 'transactionType/FETCH_TRANSACTION_TYPE_SUCCESS',
  FETCH_TRANSACTION_TYPE_FAILURE = 'transactionType/FETCH_TRANSACTION_TYPE_FAILURE',
  //save: create or update
  SAVE_TRANSACTION_TYPE_REQUEST = 'transactionType/SAVE_TRANSACTION_TYPE_REQUEST',
  SAVE_TRANSACTION_TYPE_SUCCESS = 'transactionType/SAVE_TRANSACTION_TYPE_SUCCESS',
  SAVE_TRANSACTION_TYPE_FAILURE = 'transactionType/SAVE_TRANSACTION_TYPE_FAILURE',

  //delete
  DELETE_TRANSACTION_TYPE_SUCCESS = 'transactionType/DELETE_TRANSACTION_TYPE_SUCCESS',
   DELETE_TRANSACTION_TYPE_FAILURE = 'transactionType/DELETE_TRANSACTION_TYPE_FAILURE',
}

export interface FetchTransactionTypeRequest{
    type: typeof TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_REQUEST;
}

export interface FetchTransactionTypeSuccess{
    type: typeof TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_SUCCESS,
    payload: TransactionType[];
}

export interface FetchTransactionTypeFailure{
    type: typeof TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_FAILURE,
    payload: string;
}

export interface SaveTransactionTypeRequest{
    type: typeof TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_REQUEST;
}

export interface SaveTransactionTypeSuccess{
    type: typeof TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_SUCCESS,
    payload:string;
}

export interface SaveTransactionTypeFailure{
    type: typeof TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_FAILURE,
    payload: string;
}

export interface DeleteTransactionTypeSuccess{
    type: typeof TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_SUCCESS,
    payload:string;
}

export interface DeleteTransactionTypeFailure{
    type: typeof TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_FAILURE,
    payload: string;
}

export type TransactionTypeAction = 
| FetchTransactionTypeRequest
| FetchTransactionTypeSuccess
| FetchTransactionTypeFailure

| SaveTransactionTypeRequest
| SaveTransactionTypeSuccess
| SaveTransactionTypeFailure

| DeleteTransactionTypeSuccess
| DeleteTransactionTypeFailure