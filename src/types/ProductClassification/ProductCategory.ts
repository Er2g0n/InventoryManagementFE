import type { BaseEntity } from "../Base/BaseEntity";

export interface ProductCategory extends BaseEntity {
    categoryCode: string
    
    categoryName: string
}
