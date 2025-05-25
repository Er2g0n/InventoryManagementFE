import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ProductCategory } from "@/types/ProductClassification/ProductCategory";
import { ResultService } from "@/types/Base/ResultService";

export async function getAllProductCategory (): Promise<ResultService<ProductCategory[]>> {
  const response = await fetchClient<ProductCategory[]>(
    httpMethod.GET,
    "ProductCategory",
  );
 
  if (response.data == null) {
    response.code = "-1";
    response.message = "Failed to Fetch Data";
    return response;
  }
  response.code = "0";
  return response;
    
}

export async function saveProductCategory (
  productCategory: ProductCategory
): Promise<ResultService<ProductCategory>> {
  
  const response = await fetchClient<ProductCategory, ProductCategory>(
    httpMethod.POST,
    "ProductCategory/SaveByDapper",
    productCategory
  );
  
  if (response.data==null) {
    response.code = "-1";
    response.message = "Failed to save this product category";
    return response;
  }
  response.code = "0";
  response.message = "Product category saved successfully";

  return response;
}

export async function getProductCategoryByCode (categoryCode: string): Promise<ResultService<ProductCategory>> {
  const response = await fetchClient<ProductCategory, string>(
    httpMethod.GET,
    `ProductCategory/${categoryCode}`,
  );
  
  if (response.data == null) {
    response.code = "-1";
    response.message = "Failed to get data";
    return response;
  }
  response.code = "0";
  // response.message = "Product type retrieved successfully";

  return response;
}

export async function deleteProductCategory (
  categoryCode: string
): Promise<ResultService<string>> {
  const response = await fetchClient<string, string>(
    httpMethod.DELETE,
    `ProductCategory/DeleteByDapper/${categoryCode}`,
    categoryCode
  );
  
  if (response.data == null) {
    response.code = "-1";
    response.message = "Failed to delete this product category";
    return response;
  }
  response.code = "0";
  response.message = "Product category deleted successfully";
  return response;
}