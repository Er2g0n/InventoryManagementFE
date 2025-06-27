import { AppDispatch, RootState } from "@/store/store"
import { TransactionType } from "@/types/MasterData/TransactionType";
import { useDispatch, useSelector } from "react-redux"
import { addOrUpdateTransactionType, fetchTransactionTypes, removeTransactionType } from "../action";
import { TransactionTypeActionTypes } from "../types";

export const useTransactionTypes = () => {
   const dispatch = useDispatch<AppDispatch>();
   const transactionTypes = useSelector((state: RootState) => state.transactionType.transactionTypes);
   const loading = useSelector((state: RootState) => state.transactionType.loading);
   const error = useSelector((state: RootState) => state.transactionType.error);

   const loadTransactionType = () => dispatch(fetchTransactionTypes());
   

   const saveTransactionType = (transactionType: TransactionType): Promise<{ success: boolean; message?: string }> =>
       new Promise((resolve, reject) => {
         dispatch(addOrUpdateTransactionType(transactionType))
           .then((action) => {
             if (action.type === TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_SUCCESS) {
               resolve({ success: true, message: action.payload });
             } else if (action.type === TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_FAILURE) {
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

   // const deleteTransactionType = (transactionType: string) =>
   //    dispatch(removeTransactionType(transactionType));

    const deleteTransactionType = (transactionType: string): Promise<{ success: boolean; message?: string }> =>
       new Promise((resolve, reject) => {
         dispatch(removeTransactionType(transactionType))
           .then((action) => {
             if (action.type === TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_SUCCESS) {
               resolve({ success: true, message: action.payload });
             } else if (action.type === TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_FAILURE) {
               resolve({ success: false, message: action.payload || "Failed to delete product category." });
             }
           })
           .catch((error) => {
             reject({
               success: false,
               message: error instanceof Error ? error.message : "An error occurred while deleting product category.",
             });
           });
       });

   return {
      transactionTypes,
      loading,
      error,
      loadTransactionType,
      saveTransactionType,
      deleteTransactionType
   };
};
