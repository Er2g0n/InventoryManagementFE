import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { Brand } from "@/types/MasterData/Product/ProductClassification";


export async function getAllProductBrand (): Promise<ResultService<Brand[]>> {
  const response = await fetchClient<Brand[]>(
    httpMethod.GET, 
    "Brand"
  );
  if (response.code === "-1") {
    response.message = "Failed to Fetch Data";
    return response;
  }
  response.code = "0";
  return response;
}

export async function saveBrand (
  brand: Brand
): Promise<ResultService<Brand>> {

  const response = await fetchClient<Brand, Brand>(
    httpMethod.POST,
    "Brand/SaveByDapper",
    brand
  );
  if (response.code === "-1") {
    response.message = "Failed to save this brand";
    return response;
  }
  response.code = "0";
  response.message = "Brand saved successfully";
  return response;
}



