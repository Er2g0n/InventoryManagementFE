import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { VehicleModel } from "@/types/MasterData/Product/ProductClassification";

export async function getAllVehicleModels (): Promise<ResultService<VehicleModel[]>> {
  const response = await fetchClient<VehicleModel[]>(
    httpMethod.GET,
    "VehicleModel"
  );

  if (response.code === "-1") {
    response.message = "Failed to Fetch Data";
    return response;
  }
  response.code = "0";
  return response;
}

export async function saveVehicleModel (
  vehicleModel: VehicleModel
): Promise<ResultService<VehicleModel>> {
  const response = await fetchClient<VehicleModel, VehicleModel>(
    httpMethod.POST,
    "VehicleModel/SaveByDapper",
    vehicleModel
  );

  if (response.code === "-1") {
    response.message = "Failed to save this vehicle model";
    return response;
  }
  response.code = "0";
  response.message = "Vehicle model saved successfully";

  return response;
}

export async function getVehicleModelByCode (modelCode: string): Promise<ResultService<VehicleModel>> {
  const response = await fetchClient<VehicleModel, string>(
    httpMethod.GET,
    `VehicleModel/${modelCode}`
  );

  if (response.code === "-1") {
    response.message = "Failed to get data";
    return response;
  }
  response.code = "0";
  response.message = "Vehicle model retrieved successfully";

  return response;
}

export async function deleteVehicleModel (
  modelCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `VehicleModel/DeleteByDapper/${modelCode}`,
    modelCode
  );

  if (response.code === "-1") {
    response.message = "Failed to delete this vehicle model";
    return response;
  }
  response.code = "0";
  response.message = "Vehicle model deleted successfully";

  return response;
}