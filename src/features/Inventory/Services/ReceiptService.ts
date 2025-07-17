import { fetchClient } from "@/api/fetchClient";
import httpMethod from "@/constants/httpMethod";
import { ResultService } from "@/types/Base/ResultService";
import { GoodsReceiptNote } from "@/types/WarehouseManagement/GoodsReceiptNote";

export async function GoodsReceiptNote_GetAll(): Promise<ResultService<GoodsReceiptNote[]>> {
    const response = await fetchClient<GoodsReceiptNote[]>(httpMethod.GET,"GoodsReceiptNote");
    try{
    return response;
    }catch(error){
     response.message = error instanceof Error ? error.message : "Sth wrong happen"
     return response;
    }
}


export async function GoodsReceiptNoteCode_GetByID(ID:number):Promise<ResultService<GoodsReceiptNote>> {
    const response = await fetchClient<GoodsReceiptNote>(httpMethod.GET,"GoodsReceiptNote",ID);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    return response;
}

export async function GoodsReceiptNoteCode_Save(GoodsReceiptNote:GoodsReceiptNote):Promise<ResultService<GoodsReceiptNote>> {
    const response = await fetchClient<GoodsReceiptNote>(httpMethod.POST,"GoodsReceiptNote",GoodsReceiptNote);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    return response;
}

export async function GoodsReceiptNoteCode_Update(GoodsReceiptNote:GoodsReceiptNote):Promise<ResultService<GoodsReceiptNote>> {
    const response = await fetchClient<GoodsReceiptNote>(httpMethod.PUT,"GoodsReceiptNote",GoodsReceiptNote);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    return response;
}

export async function GoodsReceiptNoteCode_Delete(GoodsReceiptNote_ID:string):Promise<ResultService<GoodsReceiptNote>> {
    const response = await fetchClient<GoodsReceiptNote>(httpMethod.DELETE,"GoodsReceiptNote",GoodsReceiptNote_ID);
    if(response.data == null){
        response.code ="-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code ="0";
    response.message="Delete successfully";
    return response;
}