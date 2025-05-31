import { BaseEntity } from "../Base/BaseEntity";

export interface TransactionType extends BaseEntity {
  transactionTypeCode: string;
  transactionTypeName: string;
  documentTypeID: number;
  description?: string;
}
