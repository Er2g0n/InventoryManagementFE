import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./Pages/Main";

const IssuePage = lazy(() => import("./Pages/[id]/IssuePage"));
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
        path: ":id",
        children: [
          {
            index: true,
            element: <MainIdPage />

          },

  
          {
            path: "Stock",
            element: <StockPage />

          },
          {
            path: "Issue",
            element: <IssuePage />
          }

        ]
      }

    ]
  }
];

export default routes;