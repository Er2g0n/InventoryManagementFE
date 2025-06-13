import { AppDispatch, RootState } from "@/store/store"
import { TransactionType } from "@/types/MasterData/TransactionType";
import { useDispatch, useSelector } from "react-redux"
import { addOrUpdateTransactionType, fetchTransactionTypes, removeTransactionType } from "../action";

export const useTransactionTypes = () => {
   const dispatch = useDispatch<AppDispatch>();
   const transactionTypes = useSelector((state: RootState) => state.transactionType.transactionTypes);
   const loading = useSelector((state: RootState) => state.transactionType.loading);
   const error = useSelector((state: RootState) => state.transactionType.error);

   const loadTransactionType = () => dispatch(fetchTransactionTypes());
   const saveTransactionType = (transactionType: TransactionType) =>
      dispatch(addOrUpdateTransactionType(transactionType));
   const deleteTransactionType = (transactionType: string) =>
      dispatch(removeTransactionType(transactionType));

   return {
      transactionTypes,
      loading,
      error,
      loadTransactionType,
      saveTransactionType,
      deleteTransactionType
   };
};
