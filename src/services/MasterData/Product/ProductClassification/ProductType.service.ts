import { ProductType } from "@/types/ProductClassification/ProductType";
import type { ResultService } from "../../../../types/Base/ResultService";
import fetchAPIAsync from "../../../Base.service";
import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";

export async function getAllProductType (): Promise<ResultService<ProductType[]>> {
  const data = await fetchClient<ProductType[]>(
    httpMethod.GET,
    "ProductType",
  );
  const response: ResultService<ProductType[]> = {
    code: "-1",
    message: "",
    data: null
  };
  if (data == null) {
    response.message = "Failed to Data";
    return response;
  }
  response.code = "0";
  response.data = data;
  return response;
    
}

export async function saveProductType (
  productType: ProductType
): Promise<ResultService<ProductType>> {
  
  const data = await fetchClient<ProductType, ProductType>(
    httpMethod.POST,
    "ProductType/SaveByDapper",
    productType
  );
  const response: ResultService<ProductType> = {
    code: "-1",
    message: "",
    data: null
  };
  if (data==null) {
    response.message = "Failed to save this product type";
    return response;
  }
  response.code = "0";
  response.data = data;
  response.message = "Product type saved successfully";

  return response;
}

export async function getProductTypeByCode (productTypeCode: string): Promise<ResultService<ProductType>> {
  const data = await fetchClient<ProductType, string>(
    httpMethod.GET,
    `ProductType/${productTypeCode}`,
  );
  const response: ResultService<ProductType> = {
    code: "-1",
    message: "",
    data: null
  };
  if (data == null) {
    response.message = "Failed to get data";
    return response;
  }
  response.code = "0";
  response.data = data;
  // response.message = "Product type retrieved successfully";

  return response;
}

export async function deleteProductType (
  productTypeCode: string
): Promise<ResultService<string>> {
  const data = await fetchClient<string, string>(
    httpMethod.DELETE,
    `ProductType/DeleteByDapper/${productTypeCode}`,
    productTypeCode
  );
  const response: ResultService<string> = {
    code: "-1",
    message: "",
    data: null
  };

  if (data == null) {
    response.message = "Failed to delete this product type";
    return response;
  }
  response.code = "0";
  response.message = "Product type deleted successfully";
  return response;
}