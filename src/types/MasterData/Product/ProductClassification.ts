import { BaseEntity } from "@/types/Base/BaseEntity";

export interface VehicleModel extends BaseEntity {
  modelCode: string;
  modelName: string;
  brandCode: string;
}

export interface ProductType extends BaseEntity {
  productTypeCode: string;
  productTypeName: string;
}

export interface ProductCategory extends BaseEntity {
  categoryCode: string;
  categoryName: string;
}

export interface Brand extends BaseEntity {
  brandCode: string;
  brandName: string;
}
