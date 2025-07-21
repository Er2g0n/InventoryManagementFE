import { fetchClient } from "@/api/fetchClient";
import httpMethod from "@/constants/httpMethod";
import { ResultService } from "@/types/Base/ResultService";
import { UnitOfMeasure } from "@/types/MasterData/Product/ProductProperties";

export async function getAllUoM(): Promise<ResultService<UnitOfMeasure[]>> {
  const response = await fetchClient<UnitOfMeasure[]>(
    httpMethod.GET,
    "UnitOfMeasure"
  );

  if (response.code !== "0") {
    response.message = "Failed to Fetch Data";
    return response;
  }
  return response;
}

export async function saveUoM(
  uoM: UnitOfMeasure
): Promise<ResultService<UnitOfMeasure>> {
  const response = await fetchClient<UnitOfMeasure, UnitOfMeasure>(
    httpMethod.POST,
    "UnitOfMeasure/SaveByDapper",
    uoM
  );

  if (response.code !== "0") {
    response.message = "Failed to save this unit of measure";
    return response;
  }

  response.message = "Unit of Measure saved successfully";
  return response;
}

export async function deleteUoM(
  uoMCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `UnitOfMeasure/DeleteByDapper/${uoMCode}`,
    uoMCode
  );

  if (response.code !== "0") {
    response.message = "Failed to delete this unit of measure";
    return response;
  }

  response.message = "Unit of Measure deleted successfully";
  return response;
}