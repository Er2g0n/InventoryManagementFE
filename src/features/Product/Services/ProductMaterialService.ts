import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { Material } from "@/types/MasterData/Product/ProductProperties";

export async function getAllMaterial(): Promise<ResultService<Material[]>> {
  const response = await fetchClient<Material[]>(
    httpMethod.GET,
    "Material",
  );
 
  if (response.code !== "0") {
    response.message = "Failed to Fetch Data";
    return response;
  }
  return response;
}

export async function saveMaterial(
  material: Material
): Promise<ResultService<Material>> {
  
  const response = await fetchClient<Material, Material>(
    httpMethod.POST,
    "Material/SaveByDapper",
    material
  );
  
  if (response.code !== "0") {
    response.message = "Failed to save this material";
    return response;
  }
  
  response.message = "Material saved successfully";

  return response;
}

// export async function getMaterialByCode(materialCode: string): Promise<ResultService<Material>> {
//   const response = await fetchClient<Material, string>(
//     httpMethod.GET,
//     `Material/${materialCode}`,
//   );
  
//   if (response.code !== "0") {
//     response.message = "Failed to get data";
//     return response;
//   }
  
//   return response;
// }

export async function deleteMaterial(
  materialCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `Material/DeleteByDapper/${materialCode}`,
    materialCode
  );
  
  if (response.code !== "0") {
    response.message = "Failed to delete this material";
    return response;
  }
 
  response.message = "Material deleted successfully";
  return response;
}