import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { Warehouse } from "@/types/WarehouseManagement/Warehouse";

export async function getAllWarehouses (): Promise<ResultService<Warehouse[]>> {
  const response = await fetchClient<Warehouse[]>(
    httpMethod.GET,
    "Warehouse"
  );

  if (response.code === "-1") {
    response.message = "Failed to Fetch Data";
    return response;
  }
  response.code = "0";
  return response;
}

export async function saveWarehouse (
  warehouse: Warehouse
): Promise<ResultService<Warehouse>> {
  const response = await fetchClient<Warehouse, Warehouse>(
    httpMethod.POST,
    "Warehouse/SaveByDapper",
    warehouse
  );

  if (response.code === "-1") {
    response.message = "Failed to save this warehouse";
    return response;
  }
  response.code = "0";
  response.message = "Warehouse saved successfully";

  return response;
}

export async function getWarehouseByCode (warehouseCode: string): Promise<ResultService<Warehouse>> {
  const response = await fetchClient<Warehouse, string>(
    httpMethod.GET,
    `Warehouse/${warehouseCode}`
  );

  if (response.code === "-1") {
    response.message = "Failed to get data";
    return response;
  }
  response.code = "0";
  response.message = "Warehouse retrieved successfully";

  return response;
}

export async function deleteWarehouse (
  warehouseCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `Warehouse/DeleteByDapper/${warehouseCode}`,
    warehouseCode
  );

  if (response.code === "-1") {
    response.message = "Failed to delete this warehouse";
    return response;
  }
  response.code = "0";
  response.message = "Warehouse deleted successfully";

  return response;
}