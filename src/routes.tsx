import type { RouteObject } from "react-router-dom";
import { ROUTES } from "@/constants/endpoint";
import MainLayout from "@/Components/Layout/MainLayout";
import NotFoundPage from "@pages/NotFoundPage";
import { Home } from "@pages/Home";
import { PartnerRoutes } from "@features/Partner";
import { ProductRoutes } from "@features/Product";
import { InventoryRoutes } from "@features/Inventory";
import { StatusMasterRoutes } from "@features/StatusMaster";
import { WarehouseManagementRoutes } from "@features/WarehouseManagement";

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
      ...InventoryRoutes,
      ...PartnerRoutes,
      ...StatusMasterRoutes,
      ...WarehouseManagementRoutes
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];

export default routes;
