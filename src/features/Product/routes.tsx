import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "@/constants/endpoint";
import MainPage from "./pages/main";

const CategoryPage = lazy(()=> import("./pages/CategoryPage"));
const TypePage = lazy(()=> import("./pages/main"));
const VehicalModelPage = lazy(()=> import("./pages/VehicleModelPage"));
export const WEB_ENPOINT = {
  main: "/",
  Category: "/Category",
  Type: "/Type",
  VehicalModel : "/VehicalModel",
};
const routes : RouteObject[] = [
    {
    path: "product",
    children: [
      {
        index: true,
        element: <MainPage />,
     
      },
      {
        path: "Category",
        element: <CategoryPage />,
      
      },
      {
        path: "Type",
        element: <TypePage />,
      },
      {
        path: "VehicalModel",
        element: <TypePage />,
      },
    ]}  
];

export default routes;