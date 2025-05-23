import type { BaseEntity } from "../Base/BaseEntity";

export interface ProductType extends BaseEntity {
    productTypeCode: string
    productTypeName: string
}