import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { Color } from "@/types/MasterData/Product/ProductProperties";

export async function getAllColor (): Promise<ResultService<Color[]>> {
  const response = await fetchClient<Color[]>(
    httpMethod.GET,
    "Color",
  );
  
  if (response.code == "-1") {
    response.message = "Failed to fetch data";
    return response;
  }
  return response;
}

export async function saveColor (
  color: Color
): Promise<ResultService<Color>> {
  
  const response = await fetchClient<Color, Color>(
    httpMethod.POST,
    "Color/SaveByDapper",
    color
  );
  
  if (response.code == "-1") {
    response.message = "Failed to save this color";
    return response;
  }
  response.message = "Saved successfully";

  return response;
}

export async function getColorByCode (colorCode: string): Promise<ResultService<Color>> {
  const response = await fetchClient<Color, string>(
    httpMethod.GET,
    `Color/${colorCode}`,
  );
  
  if (response.code == "-1") {
    response.message = "Failed to get data";
    return response;
  }
  // response.message = "Color retrieved successfully";

  return response;
}

export async function deleteColor (
  colorCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `Color/DeleteByDapper/${encodeURIComponent(colorCode)}`  
  );
 

  if (response.code == "-1") {
    response.message = "Failed to delete this color";
    return response;
  }
  response.message = "Color deleted successfully";
  return response;
}