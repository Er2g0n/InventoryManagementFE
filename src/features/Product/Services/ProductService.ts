import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { ProductParam, ProductSave } from "@/types/MasterData/Product/ProductManagement";

export async function getAllProducts (): Promise<ResultService<ProductParam[]>> {
  const response = await fetchClient<ProductParam[]>(
    httpMethod.GET,
    "Product",
  );
  
  if (response.code !== "0") {
    
    response.message = "Failed to Fetch Data";
    return response;
  }
  return response;
    
}

export async function saveProduct (
  productSave: ProductSave
): Promise<ResultService<ProductParam>> {
  
  const response = await fetchClient<ProductParam, ProductSave>(
    httpMethod.POST,
    "Product/Save",
    productSave
  );
  
  if ( response.code !== "0") {
    response.message = "Failed to save this product type";
    return response;
  }
  response.message = "Saved successfully";

  return response;
}

export async function getProductByCodeParam (productTypeCode: string): Promise<ResultService<ProductParam>> {
  const response = await fetchClient<ProductParam, string>(
    httpMethod.GET,
    `Product/GetByCodeParam/${productTypeCode}`,
  );
  
  if (response.code !== "0") {
    
    response.message = "Failed to get data";
    return response;
  }
  // response.message = "Product type retrieved successfully";

  return response;
}
