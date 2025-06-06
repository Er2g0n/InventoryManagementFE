import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./pages/main";

const CategoryPage = lazy(()=> import("./pages/CategoryPage"));
const TypePage = lazy(()=> import("./pages/TypePage"));
const ColorPage = lazy(() => import("./pages/ColorPage"));
const BrandPage = lazy(() => import("./pages/BrandPage"));
const VehicleModelPage = lazy(()=> import("./pages/VehicleModelPage"));
export const WEB_ENDPOINT = {
  main: "/",
  Category: "/Category",
  Type: "/Type",
  Color: "/Color",
  VehicleModelPage : "/VehicleModel"
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
        path: "Brand",
        element: <BrandPage />

      },
      {
        path: "VehicleModel",
        element: <VehicleModelPage />
      }
    ]}
];

export default routes;