import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "@/constants/endpoint";
import MainLayout from "@/Components/Layout/MainLayout";
import NotFoundPage from "@pages/NotFoundPage";
import { ProductRoutes } from "@features/Product";
import { Home } from "@pages/Home";
import { WarehouseRoute } from "@features/Warehouse";

export type HandleRoutes = {
  pattern: string;
};


const routes: RouteObject[] = [
  {
    path: ROUTES.APP_ROOT,
    element: <MainLayout />,
    handle: { pattern: ROUTES.APP_ROOT }, // Handle cho layout cha
    children: [
      {
        index : true,
        element : <Home />

      },
     ...ProductRoutes,
     ...WarehouseRoute
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];

export default routes;
