import { BaseEntity } from "@/types/Base/BaseEntity";

export interface ProductVariant extends BaseEntity {
  productID: number;
  productVariantCode: string;
  attributes?: string;
}

export interface ProductUoMConversion extends BaseEntity {
  productUoMConversionCode: string;
  productID: number;
  fromUoMID: number;
  toUoMID: number;
  conversionRate: number;
}

export interface ProductAttribute extends BaseEntity {
  productID: number;
  colorID: number;
  materialID: number;
}
