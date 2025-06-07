import { fetchClient } from "@/api/fetchClient";
import httpMethod from "@/constants/httpMethod";
import { ResultService } from "@/types/Base/ResultService";
import { TransactionType } from "@/types/MasterData/TransactionType";

export async function TransactionType_GetAll(): Promise<ResultService<TransactionType[]>> {
    const response = await fetchClient<TransactionType[]>(httpMethod.GET,"TransactionType",);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    return response;
}

export async function TransactionType_GetByID(ID:number):Promise<ResultService<TransactionType>> {
    const response = await fetchClient<TransactionType>(httpMethod.GET,"TransactionType",ID);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    return response;
}

export async function TransactionType_Save(TransactionType:TransactionType):Promise<ResultService<TransactionType>> {
    const response = await fetchClient<TransactionType>(httpMethod.POST,"TransactionType",TransactionType);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    return response;
}

export async function TransactionType_Update(TransactionType:TransactionType):Promise<ResultService<TransactionType>> {
    const response = await fetchClient<TransactionType>(httpMethod.PUT,"TransactionType",TransactionType);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    return response;
}

export async function TransactionType_Delete(transactionTypeCode:string):Promise<ResultService<TransactionType>> {
    const response = await fetchClient<TransactionType>(httpMethod.DELETE,"TransactionType",transactionTypeCode);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    response.message="Delete successfully";
    return response;
}