import { BaseEntity } from "../Base/BaseEntity";

export interface GoodsIssueNote extends BaseEntity {
  ginCode: string;
  warehouseID: number;
  customerID: number;
  transactionTypeID: number;
  issueDate: string;
  notes: string;
}

export interface GoodsIssueNoteLine extends BaseEntity {
  refGINCode: string;
  productID: number;
  productVariantID: number;
  uoMID: number;
  quantity: number;
  uoMConversionID: number;
  convertedQuantity: number;
  storageBinID: number;
}

