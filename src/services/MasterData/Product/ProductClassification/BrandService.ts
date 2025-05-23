// src/services/BrandService.ts
import type { ResultService } from "../../../../types/Base/ResultService";
import type { Brand } from "../../../../types/ProductClassification/Brand/Brand";
import axios from "../../../axios";

let brandCache: Brand[] | null = null;

export async function getAllBrands(
  options: { cache: boolean } = { cache: true }
): Promise<ResultService<Brand[]>> {
  if (options.cache && brandCache) {
    return { code: "0", message: "Success", data: brandCache };
  }

  const response = await axios.get<ResultService<Brand[]>>("Brand");
  brandCache = response.data.data;
  return response.data;
}

export async function getBrandById(id: number): Promise<Brand> {
  const response = await axios.get<Brand>(`Brand/${id}`);
  return response.data;
}

export async function deleteBrand(id: number): Promise<void> {
  await axios.delete("Brand", { data: id });
}

export async function getBrandByCode(
  brandCode: string
): Promise<ResultService<Brand>> {
  const response = await axios.get<ResultService<Brand>>(
    `Brand/brandCode/${brandCode}`
  );
  return response.data;
}

export async function saveBrandByDapper(
  brand: Brand
): Promise<ResultService<Brand>> {
  const response = await axios.post<ResultService<Brand>>(
    `Brand/SaveByDapper`,
    brand
  );
  const result = response.data;

  if (result.code === "0" && result.data && brandCache) {
    const index = brandCache.findIndex((b) => b.brandCode === brand.brandCode);
    if (index !== -1) {
      brandCache[index] = result.data;
    } else {
      brandCache.push(result.data);
    }
  }

  return result;
}

export async function deleteBrandByDapper(
  brandCode: string
): Promise<ResultService<void>> {
  const response = await axios.delete<ResultService<void>>(
    `Brand/DeleteByDapper`,
    {
      params: { brandCode },
    }
  );
  return response.data;
}

export function clearBrandCache(): void {
  brandCache = null;
}
