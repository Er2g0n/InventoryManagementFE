import type { BaseEntity } from "../../Base/BaseEntity";

export interface Brand extends BaseEntity {
  brandCode: string;
  brandName: string;
}

export interface BrandDto {
  brandCode: string;
  brandName: string;
  id?: number;
  rowPointer?: string;
  createdBy: string;
  updatedBy: string;
  createdDate?: string;
  updatedDate?: string;
  }
  