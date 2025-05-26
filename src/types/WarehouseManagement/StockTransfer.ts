import { BaseEntity } from "../Base/BaseEntity";

export interface StockTransfer extends BaseEntity {
  transferCode: string;
  fromWarehouseID: number;
  toWarehouseID: number;
  transactionTypeID: number;
  transferDate: string; // ISO format date
  notes?: string;
}

export interface StockTransferDetail extends BaseEntity {
  stockTransferID: number;
  productID: number;
  productVariantID: number;
  uoMID: number;
  quantity: number;
  uoMConversionID: number;
  convertedQuantity: number;
  fromStorageBinID: number;
  toStorageBinID: number;
}


