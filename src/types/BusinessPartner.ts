import { BaseEntity } from "./Base/BaseEntity";

export interface BusinessPartner extends BaseEntity {
    partnerCode: string ;
  partnerName: string ;
  isSupplier: boolean ;
  isCustomer: boolean ;
  contactInfo: string ;
  statusID: number;

}