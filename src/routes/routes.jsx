import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Landing from "../components/Pages/Landing";
import AdminDashboard from "../layouts/AdminDashboard";
// import AdminDashboardHome from "../components/Pages/AdminDashboard/AdminDashboardHome";
import AdminManageEvent from "../components/Pages/AdminDashboard/AdminManageEvent";
import AdminEvents from "../components/Pages/AdminDashboard/AdminEvents";


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
      children:[
        // {
        //   path:"adminhome",
        //   element:<AdminDashboardHome></AdminDashboardHome>,
        // },
        {
          path:"manageevents",
          element:<AdminManageEvent></AdminManageEvent>,
        },
        {
          path:"events",
          element:<AdminEvents></AdminEvents>,
        },
      ]
    }
  ]);