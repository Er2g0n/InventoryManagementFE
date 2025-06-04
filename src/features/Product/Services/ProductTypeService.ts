import { ProductType } from "@/types/ProductClassification/ProductType";
import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";

export async function getAllProductType (): Promise<ResultService<ProductType[]>> {
  const response = await fetchClient<ProductType[]>(
    httpMethod.GET,
    "ProductType",
  );
  
  if (response.code == "-1") {
    
    response.message = "Failed to Fetch Data";
    return response;
  }
  response.code = "0";
  return response;
    
}

export async function saveProductType (
  productType: ProductType
): Promise<ResultService<ProductType>> {
  
  const response = await fetchClient<ProductType, ProductType>(
    httpMethod.POST,
    "ProductType/SaveByDapper",
    productType
  );
  
  if ( response.code == "-1") {
    response.message = "Failed to save this product type";
    return response;
  }
  response.code = "0";
  response.message = "Saved successfully";

  return response;
}

export async function getProductTypeByCode (productTypeCode: string): Promise<ResultService<ProductType>> {
  const response = await fetchClient<ProductType, string>(
    httpMethod.GET,
    `ProductType/${productTypeCode}`,
  );
  
  if (response.code == "-1") {
    
    response.message = "Failed to get data";
    return response;
  }
  response.code = "0";
  // response.message = "Product type retrieved successfully";

  return response;
}

export async function deleteProductType (
  productTypeCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `ProductType/DeleteByDapper/${productTypeCode}`,
    productTypeCode
  );
 

  if (response.code == "-1") {
   
    response.message = "Failed to delete this product type";
    return response;
  }
  response.code = "0";
  response.message = "Product type deleted successfully";
  return response;
}