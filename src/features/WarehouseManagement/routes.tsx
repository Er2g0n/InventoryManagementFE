import MainPage from "./pages/Main";
import { RouteObject } from "react-router-dom";
import MainIdPage from "./pages/[id]/MainId";
import WarehousePage from "./pages/WarehousePage";

export const WEB_ENDPOINT = {
  main: "/",
  Warehouse: "/Warehouse"
};

const routes: RouteObject[] = [
  {
    path: "warehouseManagement",
    children: [
      {
        index: true,
        element: <MainPage />

      },

      {
        path: "Warehouse",
        element: <WarehousePage />
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

          }
       

        ]
      }

    ]
  }
];

export default routes;