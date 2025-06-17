import { fetchClient } from "@/api/fetchClient";
import { BusinessPartner } from "@/types/BusinessPartner";
const defaultUrl = "Businesspartner";

export async function getAll () : Promise<BusinessPartner[]>  {
  const response = await fetchClient<BusinessPartner[]>("GET", `${defaultUrl}`);

  return response.data??[];
}
export async function PartnerSave (dataSave : BusinessPartner) : Promise<BusinessPartner | null> {
  const response = await fetchClient<BusinessPartner, BusinessPartner>("POST", `${defaultUrl}/SaveByDapper`, dataSave);

  return response.data ?? null;
}
export async function ParnterDeleteByCode (code : string) : Promise<boolean> {
  const response = await fetchClient("DELETE", `${defaultUrl}/DeleteByDapper/${code}`);

  return response.code+"" === 200+"";
}