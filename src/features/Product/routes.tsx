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

export const WEB_ENDPOINT = {
  main: "/",
  AddProduct: "Add",
  Category: "/Category",
  Type: "/Type",
  Color: "/Color",
  Material: "/Material",
  TransactionTypePage:"/TransactionType",
  Brand: "/Brand",
  VehicleModel : "/VehicleModel"
};
const routes : RouteObject[] = [
  {
    path: "product",
    children: [
      {
        index: true,
        element: <MainPage />
     
      },
      {
        path: "add",
        element: <AddProductPage />
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
      }
    ]}
];

export default routes;