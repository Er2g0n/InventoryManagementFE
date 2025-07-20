import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
const MainPage = lazy(() => import("./pages/main"));
const MainIdPage = lazy(() => import("./pages/[id]/mainId"));
const routes: RouteObject[] = [
  {
    path: "StatusMaster",
    children: [
      {
        index: true,
        element: <MainPage />

      },
      {
        path: ":id",
        element: <MainIdPage />
      }
    ]
  }
];

export default routes;