import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./Pages/Main";

const WarehouseDashboardPage = lazy(() => import("./Pages/WarehouseDashboardPage"));
const WarehousePage = lazy(() => import("./Pages/[id]/WarehousePage"));
const IssuePage = lazy(() => import("./Pages/[id]/IssuePage"));
const ReceiptPage = lazy(() => import("./Pages/[id]/ReceiptPage"));
const StockPage = lazy(() => import("./Pages/[id]/StockPage"));
const MainIdPage = lazy(() => import("./Pages/[id]/MainId"));
const GoodsReceiptNotePage = lazy(() => import("./Pages/[id]/GoodsReceiptNotePage"));


export const WEB_ENDPOINT = {
  main: "/",
  Warehouse: "/Warehouse"
};

const routes: RouteObject[] = [
  {
    path: "inventory",
    children: [
      {
        index: true,
        element: <MainPage />

      },
      {
        path: "GoodsReceiptNote",
        element: <GoodsReceiptNotePage />
      },
      {
        path: "WarehouseDashboard",
        element: <WarehouseDashboardPage />
      },
      {
        path: ":id",
        children: [
          {
            index: true,
            element: <MainIdPage />

          },

          {
            path: "Warehouse",
            element: <WarehousePage />

          },
          {
            path: "Stock",
            element: <StockPage />

          },
          {
            path: "Issue",
            element: <IssuePage />
          },
          {
            path: "Receipt",
            element: <ReceiptPage />
          }
        ]
      }

    ]
  }
];

export default routes;