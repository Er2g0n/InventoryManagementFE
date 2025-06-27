import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./Pages/Main";

const IssuePage = lazy(() => import("./Pages/[id]/IssuePage"));
const ReceiptPage = lazy(() => import("./Pages/[id]/ReceiptPage"));
const StockPage = lazy(() => import("./Pages/[id]/StockPage"));
const MainIdPage=lazy(()=>import("./Pages/[id]/MainId"));

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
        path: ":id",
        children: [
          {
            index :true,
            element: <MainIdPage />

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