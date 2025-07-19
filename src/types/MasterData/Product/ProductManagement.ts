import { BaseEntity } from "@/types/Base/BaseEntity";
import { Dimension, UnitOfMeasure } from "./ProductProperties";
import { Brand, ProductCategory, ProductType, VehicleModel } from "./ProductClassification";

export interface ProductVariant extends BaseEntity {
  productID: number;
  productVariantCode: string;
  attributes?: string;
}

export interface ProductImages extends BaseEntity {
  imageCode: string;
  productVariantCode: string;
  refProductCode: string;
  position: number;
  imagePath: string;
  isPrimary: boolean;
}

export interface ProductUoMConversion extends BaseEntity {
  productUoMConversionCode: string;
  productID: number;
  fromUoMID: number;
  fromUoMName?: string;
  toUoMID: number;
  toUoMName?: string;
  conversionRate: number;
}

export interface ProductAttribute extends BaseEntity {
  productID: number;
  colorID: number;
  materialID: number;
}

export interface Product extends BaseEntity {
  productCode?: string;
  productName: string;
  modelID: number;
  categoryID: number;
  typeID: number;
  brandID: number;
  uoMID: number;
  description: string;
  publicImgID?: string | null;
  imagePath?: string | null;
  purchasePrice: number;
  salePrice: number;
}

export interface ImageFileDTO {
  imageFile?: File | null;
  isPrimary?: boolean;
  position?: number;
}

export interface VariantParam {
  productVariantCode?: string;
  imageCode?: string;
  attributeCode?: string;
  refProductCode?: string;
  position?: number;
  imagePath?: string;
  isPrimary?: boolean;
  colorID: number;
  colorName?: string | null;
  materialID: number;
  materialName?: string | null;
}

export interface ProductSave {
  product: Product;
  dimension: Dimension;
  variantParams?: VariantParam[];
  productImg?: File | null;
  imageFiles?: ImageFileDTO[] | null;
  variantImgs?: ImageFileDTO[] | null;
}

export interface ProductParam extends BaseEntity {
  productCode: string;
  productName: string;
  description: string;
  publicImgID: string;
  imagePath: string;
  purchasePrice: number;
  salePrice: number;

  vehicleModel: VehicleModel;
  productCategory: ProductCategory;
  productType: ProductType;
  brand: Brand;
  dimension: Dimension;
  dimensionUoM: string;
  unitOfMeasure: UnitOfMeasure;

  variantParams: VariantParam[];
  productImages: ProductImages[];
}


