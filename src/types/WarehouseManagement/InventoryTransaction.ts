import { BaseEntity } from "../Base/BaseEntity";

export interface InventoryTransaction extends BaseEntity {
  inventoryTransactionCode: string;
  productID: number;
  productVariantID?: number;
  uoMID: number;
  quantity: number;
  warehouseID: number;
  storageBinID?: number;
  transactionTypeID: number;
  transactionDate: string;
  referenceID?: number;
  referenceType?: string;
  notes?: string;
}

