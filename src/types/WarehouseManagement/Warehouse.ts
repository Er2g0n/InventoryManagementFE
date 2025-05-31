import { BaseEntity } from "../Base/BaseEntity";

export interface Warehouse extends BaseEntity {
  warehouseCode: string;
  warehouseName: string;
  allowNegativeStock: boolean;
  address: string;
  binLocationCount?: number;
}
