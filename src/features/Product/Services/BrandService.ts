"use client"
import { fetchClient } from "@/api/fetchClient";
import { ResultService } from "@/types/Base/ResultService";
import { Brand } from "@/types/ProductClassification/Brand/Brand";


let brandCache: Brand[] | null = null;

export async function getAllBrands(
  options: { cache: boolean } = { cache: true }
): Promise<ResultService<Brand[]>> {
  const response = await fetchClient<Brand[]>("GET","Brand"); 
  return response;
}

export async function getBrandById(id: number): Promise<Brand> {
  const response = await fetchClient<Brand>("GET",`Brand/${id}`)
  return response.data;
}

export async function deleteBrand(id: number): Promise<void> {
   await fetchClient("DELETE","Brand",{ data: id });
}

export async function getBrandByCode(
  brandCode: string
): Promise<ResultService<Brand>> {
  const response = await fetchClient<Brand>("GET",
        `Brand/brandCode/${brandCode}`
  )
  return response;
}

export async function saveBrandByDapper(
  brand: Brand
): Promise<ResultService<Brand>> {
  const response = await fetchClient<Brand,Brand>("POST","Brand/SaveByDapper",brand)
  
  const result = response;

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
  const response = await fetchClient<void>("DELETE",
        `Brand/DeleteByDapper`,
    {
      params: { brandCode },
    }
  )
  return response;

}

export function clearBrandCache(): void {
  brandCache = null;
}
