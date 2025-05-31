import { BaseEntity } from "../Base/BaseEntity";

export interface StatusMaster extends BaseEntity {
  statusCode: string;
  statusName: string;
  description: string;
}
