import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./pages/main";

const CategoryPage = lazy(()=> import("./pages/CategoryPage"));
const TypePage = lazy(()=> import("./pages/TypePage"));
const ColorPage = lazy(() => import("./pages/ColorPage"));
const MaterialPage = lazy(() => import("./pages/MaterialPage"));
const BrandPage = lazy(() => import("./pages/BrandPage"));
const VehicleModelPage = lazy(()=> import("./pages/VehicleModelPage"));
const TransactionTypePage = lazy(()=> import("./pages/TransactionTypePage"));
const AddProductPage = lazy(() => import("./pages/Product/add/AddProductPage"));
const ListProductPage = lazy(() => import("./pages/Product/ListProductPage"));

const UoMPage = lazy(() => import("./pages/UoMPage"));
const EditProductPage = lazy(() => import("./pages/Product/[code]/EditProductPage"));
const ProductDetailPage = lazy(() => import("./pages/Product/[code]/ProductDetailPage"));
const ProductConversion = lazy(() => import("./pages/ProductUoMConversionPage"));
export const WEB_ENDPOINT = {
  main: "/",
  AddProduct: "Add",
  EditProduct: "Edit/:productCode",
  ProductDetail: "Detail/:productCode",
  ListProduct: "List",
  Category: "/Category",
  Type: "/Type",
  Color: "/Color",
  Material: "/Material",
  TransactionTypePage:"/TransactionType",
  Brand: "/Brand",
  VehicleModel : "/VehicleModel",
  UoM: "/UoM",
  Conversion: "/Conversion"
};
const routes : RouteObject[] = [
  {
    path: "product",
    children: [
      {
        path: "add",
        element: <AddProductPage />
      },
      {
        path: "edit/:productCode",
        
        element: <EditProductPage  />
      },
      {
        path: "detail/:productCode",
        element: <ProductDetailPage />
      },
      {
        path: "",
        element: <ListProductPage />
      },
      {
        path:"Conversion",
        element: <ProductConversion />

      },
      {
        path: "Category",
        element: <CategoryPage />
      
      },
      {
        path: "Type",
        element: <TypePage />
      },
      {
        path: "Color",
        element: <ColorPage />

      },
      {
        path: "Material",
        element: <MaterialPage />
      },
      {
        path: "Brand",
        element: <BrandPage />

      },
      {
        path: "VehicleModel",
        element: <VehicleModelPage />
      },
      {
        path: "TransactionType",
        element: <TransactionTypePage />
      },
      {
        path: "UoM",
        element: <UoMPage />
      }
    ]}
];

export default routes;