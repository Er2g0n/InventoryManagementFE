import { BaseEntity } from "../Base/BaseEntity";

export interface GoodsReceiptNote extends BaseEntity {
  grnCode: string;
  warehouseID: number;
  supplierID: number;
  transactionTypeID: number;
  receiptDate: string;
  notes: string;
}

export interface GoodsReceiptNoteLine extends BaseEntity {
  refGRNCode: string;
  productID: number;
  productVariantID: number;
  uoMID: number;
  quantity: number;
  uoMConversionID: number;
  convertedQuantity: number;
  storageBinID: number;
}


