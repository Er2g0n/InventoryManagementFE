import { BaseEntity } from "@/types/Base/BaseEntity";

export interface Color extends BaseEntity {
  colorCode: string;
  colorName: string;
}

export interface Material extends BaseEntity {
  materialCode: string;
  materialName: string;
}

export interface Dimension extends BaseEntity {
  height?: number;
  length?: number;
  width?: number;
  uoMHeightCode: string;
  uoMLengthCode: string;
  uoMWidthCode: string;
}

export interface UnitOfMeasure extends BaseEntity {
  uoMCode: string;
  uoMName: string;
  uoMDescription: string;
}
