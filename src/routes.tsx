import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { ROUTES } from "@/constants/endpoint";
import MainLayout from "@components/Layout/MainLayout";
import NotFoundPage from "@pages/NotFound";

// Code splitting for lazy loading pages
const HomePage = lazy(() => import("@pages/Home"));
const ReadPage = lazy(() => import("@pages/Read"));
const RouterQuery = lazy(() => import("@pages/RouterQuery"));

const StatusMaster = lazy(() => import("@pages/MasterData/StatusMaster"));

const BrandList = lazy(() => import("@pages/BrandList"));
const BrandDetail = lazy(() => import("@pages/BrandList/BrandDetail"));
const CurrentStockPage = lazy(() => import("@pages/CurrentStock"));

// Define all application routes with proper hierarchy
export const WEB_ENPOINT = {
  Home: "/",
  Read: "/read",
  Route: "/route",
  Brand: {
    index: "/Brand",
    id: "/Brand/:id"
  },
  // Develop Module 2: Master Data
  StatusMaster: {
    index: "/StatusMaster"
  },
  Warehouse: {
    index: "/Warehouse"
  },



  CurrentStock: {
    index: "/current-stock"
  }
};
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
        index: true,
        element: <HomePage />,
        handle: { pattern: WEB_ENPOINT.Home }
      },
      {
        path: "read",
        element: <ReadPage />,
        handle: { pattern: WEB_ENPOINT.Read }
      },
      {
        path: "route",
        element: <RouterQuery />,
        handle: { pattern: WEB_ENPOINT.Route }
      },
      // Develop Module 1.1: ProductClassification
      // Brand routes
      {
        path: "Brand",
        element: <BrandList />,
        handle: { pattern: WEB_ENPOINT.Brand.index }
      },
      {
        path: "Brand/:id",
        element: <BrandDetail />,
        handle: { pattern: WEB_ENPOINT.Brand.id }
      },
      // Develop Module 2: Master Data
      // Status Master routes
      {
        path: "StatusMaster",
        element: <StatusMaster />,
        handle: { pattern: WEB_ENPOINT.StatusMaster.index }
      },
      // Current Stock routes
      {
        path: "current-stock",
        element: <CurrentStockPage />,
        handle: { pattern: WEB_ENPOINT.CurrentStock.index }
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
];

export default routes;
