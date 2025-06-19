import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Landing from "../components/Pages/Landing";
import AdminDashboard from "../layouts/AdminDashboard";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Landing></Landing>,
        },
        
      ]
    },
    // Admin dashboard
    {
      path: "admindashboard",
      element: <AdminDashboard></AdminDashboard>,
    }
  ]);