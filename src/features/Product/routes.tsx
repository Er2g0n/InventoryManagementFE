import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./pages/main";

const CategoryPage = lazy(()=> import("./pages/CategoryPage"));
const TypePage = lazy(()=> import("./pages/TypePage"));
const VehicalModelPage = lazy(()=> import("./pages/VehicleModelPage"));
export const WEB_ENPOINT = {
  main: "/",
  Category: "/Category",
  Type: "/Type",
  VehicalModel : "/VehicalModel"
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
        path: "VehicalModel",
        element: <VehicalModelPage />
      }
    ]}
];

export default routes;