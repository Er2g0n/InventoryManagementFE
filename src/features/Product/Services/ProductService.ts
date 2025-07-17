import httpMethod from "@/constants/httpMethod";
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { ImageFileDTO, ProductParam, ProductSave } from "@/types/MasterData/Product/ProductManagement";


export async function getAllProducts(): Promise<ResultService<ProductParam[]>> {
  const response = await fetchClient<ProductParam[]>(
    httpMethod.GET,
    "Product/GetAllParam",
  );

  if (response.code !== "0") {

    response.message = "Failed to Fetch Data";
    return response;
  }
  return response;

}

export async function saveProduct(
  productSave: ProductSave
): Promise<ResultService<ProductParam>> {
  const formData = new FormData();
  // Gửi product.Product
  appendObjectToFormData(formData, productSave.product, "product.Product");

  // Gửi product.Dimension
  appendObjectToFormData(formData, productSave.dimension, "product.Dimension");

  // Gửi product.VariantParams
  appendArrayToFormData(formData, productSave.variantParams || [], "product.VariantParams");

  // Gửi product.ProductImg
  if (productSave.productImg && productSave.productImg instanceof File) {
    formData.append("product.ProductImg", productSave.productImg);
  }

  // Gửi product.ImageFiles
  appendFileArrayToFormData(formData, productSave.imageFiles || [], "product.ImageFiles");

  // Gửi product.VariantImgs
  appendFileArrayToFormData(formData, productSave.variantImgs || [], "product.VariantImgs");

  // Log FormData để debug
  console.log("FormData entries before sending:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
  }

  const response = await fetchClient<ProductParam, FormData>(
    httpMethod.POST,
    "Product/Save",
    formData,
  );

  if (response.code !== "0") {
    response.message = "Failed to save this product type";
    return response;
  }
  response.message = "Saved successfully";

  return response;
}

export async function getProductByCodeParam(productTypeCode: string): Promise<ResultService<ProductParam>> {
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


// Hàm chung để thêm các trường của object vào FormData
function appendObjectToFormData(formData: FormData, obj: any, prefix: string) {
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(`${prefix}.${key}`, value.toString());
    }
  });
}

// Hàm chung để thêm mảng object vào FormData
function appendArrayToFormData<T extends Record<string, any>>(formData: FormData, array: T[], prefix: string) {
  array?.forEach((item, index) => {
    Object.entries(item).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(`${prefix}[${index}].${key}`, value.toString());
      }
    });
  });
}

// Hàm chung để thêm mảng file vào FormData
function appendFileArrayToFormData(formData: FormData, array: ImageFileDTO[], prefix: string) {
  array?.forEach((file, index) => {
    if (file.imageFile && file.imageFile instanceof File) {
      formData.append(`${prefix}[${index}].ImageFile`, file.imageFile);
      formData.append(`${prefix}[${index}].IsPrimary`, file.isPrimary.toString());
    }
  });
}

