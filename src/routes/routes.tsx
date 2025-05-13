import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Brands from "../pages/ProductClassification/Brands";
// import Login from "../pages/Admin/Login";

export const router = createBrowserRouter([
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/",
  //   element: <Login />, // Default route goes to login
  // },
  {
    path: "/",
    element: <MainLayout />, // MainLayout wraps admin pages with Sidebar
    children: [
     
      {
        path: "home", // Maps to /home
        element: <Home />,
      },

      // Product Classification
      // Brand
      {
        path: "brands",
        element: <Brands />,
      },


      // Product Management






    ],
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>, // Fallback for undefined routes
  },
]);