import { fetchClient } from "@/api/fetchClient";
import httpMethod from "@/constants/httpMethod";
import { ResultService } from "@/types/Base/ResultService";
import { GoodsReceiptNote, GoodsReceiptNote_Param, GoodsReceiptNoteLine } from "@/types/WarehouseManagement/GoodsReceiptNote";

export async function GoodsReceiptNote_GetAll(): Promise<ResultService<GoodsReceiptNote[]>> {
    return await fetchClient<GoodsReceiptNote[]>(httpMethod.GET, "GoodsReceiptNote");
}


export async function GoodsReceiptNoteCode_GetByID(ID: number): Promise<ResultService<GoodsReceiptNote>> {
    return await fetchClient<GoodsReceiptNote>(httpMethod.GET, "GoodsReceiptNote", ID);
}

export async function GoodsReceiptNoteCode_Save(GoodsReceiptNote: GoodsReceiptNote): Promise<ResultService<GoodsReceiptNote>> {
    return await fetchClient<GoodsReceiptNote>(httpMethod.POST, "GoodsReceiptNote/SaveByDapper", GoodsReceiptNote);
}

export async function GoodsReceiptNoteCode_Update(GoodsReceiptNote: GoodsReceiptNote): Promise<ResultService<GoodsReceiptNote>> {
    const response = await fetchClient<GoodsReceiptNote>(httpMethod.PUT, "GoodsReceiptNote", GoodsReceiptNote);
    if (response.data == null) {
        response.code = "-1";
        response.message = "Failed to Fetch Data";
        return response;
    }

    response.code = "0";
    return response;
}

export async function GoodsReceiptNoteCode_DeleteHeaderAndDetail(GoodsReceiptNoteCode: string): Promise<ResultService<GoodsReceiptNote>> {
    const url = `GoodsReceiptNote/HeaderLine/DeleteHeaderAndLine/ID?grnCode=${encodeURIComponent(GoodsReceiptNoteCode)}`;
    return await fetchClient<GoodsReceiptNote>(httpMethod.DELETE, url);
}

export async function GoodsReceiptNoteLine_Get_ByGRNCode(grnCode: string): Promise<ResultService<GoodsReceiptNoteLine[]>> {
    const url = `GoodsReceiptNote/GoodsReceiptNoteLine/GRNCode?GRNCode=${encodeURIComponent(grnCode)}`;
    return await fetchClient<GoodsReceiptNoteLine[]>(httpMethod.GET, url);
}

export async function GoodsReceiptNoteLine_Save_HeaderAndLine(param: GoodsReceiptNote_Param): Promise<ResultService<GoodsReceiptNote_Param>> {
    return await fetchClient<GoodsReceiptNote_Param>(httpMethod.POST, "GoodsReceiptNote/HeaderLine/CreateBoth", param);
}

export async function GoodsReceiptNoteLine_Delete_ByCode(RowPointer: string): Promise<ResultService<GoodsReceiptNoteLine>> {
    const url = `GoodsReceiptNote/GoodsReceiptNoteLine/GoodsReceiptNoteLine_Delete_SingleLine?rowpointer=${encodeURIComponent(RowPointer)}`;
    return await fetchClient<GoodsReceiptNoteLine>(httpMethod.DELETE, url);
}
