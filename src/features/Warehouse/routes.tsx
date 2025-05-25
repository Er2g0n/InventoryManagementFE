import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./Pages/Main";

const IssuePage = lazy(()=> import("./Pages/IssuePage"));
const ReceiptPage = lazy(()=> import("./Pages/ReceiptPage"));
const StockPage = lazy(()=> import("./Pages/StockPage"));
export const WEB_ENPOINT = {
  main: "/",
  Category: "/Category",
  Type: "/Type",
  VehicalModel : "/VehicalModel"
};
const routes : RouteObject[] = [
    {
    path: "warehouse",
    children: [
      {
        index: true,
        element: <MainPage />
     
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
    ]}
];

export default routes;