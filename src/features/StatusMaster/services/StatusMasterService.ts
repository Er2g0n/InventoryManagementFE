import { fetchClient } from "@/api/fetchClient";
import { StatusMaster } from "@/types/StatusMaster";
const defaultUrl = "StatusMaster";

export async function getAll (): Promise<StatusMaster[]> {
  const response = await fetchClient<StatusMaster[]>("GET", `${defaultUrl}`);

  return response.data ?? [];
}

export async function StatusMasterSave (dataSave: StatusMaster): Promise<StatusMaster | null> {
  const response = await fetchClient<StatusMaster, StatusMaster>("POST", `${defaultUrl}/Save`, dataSave);

  return response.data ?? null;
}

export async function StatusMasterDeleteByCode (code: string): Promise<boolean> {
  const response = await fetchClient("DELETE", `${defaultUrl}/DeleteByDapper/${code}`);

  return response.code + "" === "0";
}