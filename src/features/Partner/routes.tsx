import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainPage from "./pages/main";
const MainIdPage = lazy(()=> import("./pages/[id]/mainId"));
const routes : RouteObject[] = [
    {
    path: "Partner",
    children: [
      {
        index: true,
        element: <MainPage />
     
      },
      {
        path : ":id",
        element: <MainIdPage />
     
      },
    ]}
];

export default routes;