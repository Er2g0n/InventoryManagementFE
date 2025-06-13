import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { Brand } from "@/types/MasterData/Product/ProductClassification";


export async function getAllBrands (): Promise<ResultService<Brand[]>> {
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

export async function getBrandByCode (brandCode: string): Promise<ResultService<Brand>> {
  const response = await fetchClient<Brand, string>(
    httpMethod.GET,
    `Brand/${brandCode}`,
  );

  if (response.code === "-1") {
    response.message = "Failed to get data";
    return response;
  }
  response.code = "0";
  // response.message = "Brand retrieved successfully";

  return response;
}

export async function deleteBrand (
  brandCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `Brand/${brandCode}`,
  );

  if (response.code === "-1") {
    response.message = "Failed to delete this brand";
    return response;
  }
  response.code = "0";
  response.message = "Brand deleted successfully";

  return response;
}


