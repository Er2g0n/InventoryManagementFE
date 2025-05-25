
import { ProductCategory } from "@/types/ProductClassification/ProductCategory";

// Định nghĩa trạng thái của slice
export interface ProductCategoryState {
  productCategories: ProductCategory[];
  loading: boolean;
  error: string | null;
}

// Định nghĩa các type cho actions
export enum ProductCategoryActionTypes {
  //getall
  FETCH_PRODUCT_CATEGORIES_REQUEST = 'productCategory/FETCH_PRODUCT_CATEGORIES_REQUEST',
  FETCH_PRODUCT_CATEGORIES_SUCCESS = 'productCategory/FETCH_PRODUCT_CATEGORIES_SUCCESS',
  FETCH_PRODUCT_CATEGORIES_FAILURE = 'productCategory/FETCH_PRODUCT_CATEGORIES_FAILURE',
  //save: create or update
  SAVE_PRODUCT_CATEGORY_REQUEST = 'productCategory/SAVE_PRODUCT_CATEGORY_REQUEST',
  SAVE_PRODUCT_CATEGORY_SUCCESS = 'productCategory/SAVE_PRODUCT_CATEGORY_SUCCESS',
  SAVE_PRODUCT_CATEGORY_FAILURE = 'productCategory/SAVE_PRODUCT_CATEGORY_FAILURE',

  //delete
  DELETE_PRODUCT_CATEGORY_SUCCESS = 'productCategory/DELETE_PRODUCT_CATEGORY_SUCCESS',
   DELETE_PRODUCT_CATEGORY_FAILURE = 'productCategory/DELETE_PRODUCT_CATEGORY_FAILURE',
}

export interface FetchProductCategoriesRequest {
  type: typeof ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_REQUEST;
}

export interface FetchProductCategoriesSuccess {
  type: typeof ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_SUCCESS;
  payload: ProductCategory[];
}

export interface FetchProductCategoriesFailure {
  type: typeof ProductCategoryActionTypes.FETCH_PRODUCT_CATEGORIES_FAILURE;
  payload: string;
}

export interface SaveProductCategoryRequest {
  type: typeof ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_REQUEST;
}

export interface SaveProductCategorySuccess {
  type: typeof ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_SUCCESS;
  payload: ProductCategory;
}

export interface SaveProductCategoryFailure {
  type: typeof ProductCategoryActionTypes.SAVE_PRODUCT_CATEGORY_FAILURE;
  payload: string;
}

export interface DeleteProductCategorySuccess {
  type: typeof ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS;
  payload: string;
}

export interface DeleteProductCategoryFailure {
  type: typeof ProductCategoryActionTypes.DELETE_PRODUCT_CATEGORY_FAILURE;
  payload: string;
}



export type ProductCategoryAction =
  | FetchProductCategoriesRequest
  | FetchProductCategoriesSuccess
  | FetchProductCategoriesFailure
  | SaveProductCategoryRequest
  | SaveProductCategorySuccess
  | SaveProductCategoryFailure
  | DeleteProductCategorySuccess
  | DeleteProductCategoryFailure;