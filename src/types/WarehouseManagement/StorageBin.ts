import { BaseEntity } from "../Base/BaseEntity";

export interface StorageBin extends BaseEntity {
  warehouseID: number;
  storageBinCode: string;
  description?: string;
}
