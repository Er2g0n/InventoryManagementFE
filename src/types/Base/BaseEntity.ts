export interface BaseEntity {
    id?: number;
    rowPointer?: string;
    createdBy?: string | null;
    createdDate?: string | null;
    updatedBy?: string | null;
    updatedDate?: string | null;
  }