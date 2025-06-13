import { createSlice } from "@reduxjs/toolkit";
import { DeleteTransactionTypeFailure, 
    DeleteTransactionTypeSuccess, 
    FetchTransactionTypeFailure, 
    FetchTransactionTypeSuccess, 
    SaveTransactionTypeFailure, 
    SaveTransactionTypeSuccess, 
    TransactionTypeActionTypes, 
    TransactionTypeState } from "./types";

const initialState: TransactionTypeState={
    transactionTypes:[],
    loading: false,
    error: null,
}

const transactionTypeSlice = createSlice({
    name:'transactionType',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        // Fetch transactionType
        .addCase(TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_REQUEST,(state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_SUCCESS,(state,action:FetchTransactionTypeSuccess)=>{
            state.loading = false;
            state.transactionTypes = action.payload;
        })
         .addCase(TransactionTypeActionTypes.FETCH_TRANSACTION_TYPE_FAILURE,(state,action:FetchTransactionTypeFailure)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // Save transactionType
        .addCase(TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_REQUEST,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_SUCCESS,(state,action:SaveTransactionTypeSuccess)=>{
            state.loading=false;
            const index = state.transactionTypes.findIndex(
                (tt) => tt.transactionTypeCode === action.payload.transactionTypeCode
            );
            if(index !== -1){
                state.transactionTypes[index] = action.payload;
            }
            else{
                state.transactionTypes.push(action.payload);
            }
        })
        .addCase(TransactionTypeActionTypes.SAVE_TRANSACTION_TYPE_FAILURE,(state,action:SaveTransactionTypeFailure)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // Delete transactionType
        .addCase(TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_FAILURE,(state,action:DeleteTransactionTypeFailure)=>{
            state.transactionTypes = state.transactionTypes.filter(
                (tt)=> tt.transactionTypeCode!== action.payload
            );
        })
        .addCase(TransactionTypeActionTypes.DELETE_TRANSACTION_TYPE_SUCCESS,(state,action:DeleteTransactionTypeSuccess)=>{
            state.error = action.payload;
        });
    },
});

export default transactionTypeSlice.reducer;