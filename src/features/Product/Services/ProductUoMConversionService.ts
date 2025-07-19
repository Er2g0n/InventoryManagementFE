import { fetchClient } from "@/api/fetchClient";
import httpMethod from "@/constants/httpMethod";
import { ResultService } from "@/types/Base/ResultService";
import { ProductUoMConversion } from "@/types/MasterData/Product/ProductManagement";

export async function getAllProductUoMConversions(): Promise<ResultService<ProductUoMConversion[]>> {
  const response = await fetchClient<ProductUoMConversion[]>(
    httpMethod.GET,
    "Conversion",
  );

  if (response.code !== "0") {
    response.message = "Failed to Fetch Data";
    return response;
  }
  return response;
}
export async function saveConversion(
  productUoMConversion: ProductUoMConversion
): Promise<ResultService<ProductUoMConversion>> {
  const response = await fetchClient<ProductUoMConversion, ProductUoMConversion>(
    httpMethod.POST,
    "Conversion/Save",
    productUoMConversion
  );

  if (response.code !== "0") {
    response.message = "Failed to save this UoM conversion";
    return response;
  }
  response.message = "Saved successfully";

  return response;
}

export async function getProductUoMConversion(
  productUoMConversionCode: string
): Promise<ResultService<ProductUoMConversion>> {
  const response = await fetchClient<ProductUoMConversion, string>(
    httpMethod.GET,
    `Conversion/GetByCode/${productUoMConversionCode}`,
  );

  if (response.code !== "0") {
    response.message = "Failed to get data";
    return response;
  }
  return response;
}


export async function deleteConversion(
  productUoMConversionCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `Conversion/${productUoMConversionCode}`,
  );

  if (response.code !== "0") {
    response.message = "Failed to delete this UoM conversion";
    return response;
  }
  response.message = "Deleted successfully";

  return response;
}