import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Landing from "../components/Pages/Landing";
import AdminDashboard from "../layouts/AdminDashboard";
import AdminDashboardHome from "../components/Pages/AdminDashboard/AdminDashboardHome"; 
import AdminManageEvent from "../components/Pages/AdminDashboard/AdminManageEvent";
import AdminEvents from "../components/Pages/AdminDashboard/AdminEvents";
import Signin from "../components/Signin";
import Signup from "../components/Signup";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/signin",
        element: <Signin></Signin>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
    ],
  },
  // Admin dashboard
  {
    path: "admindashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "adminhome", 
        element: <AdminDashboardHome />, 
      },
      {
        path: "manageevents",
        element: <AdminManageEvent />,
      },
      {
        path: "events",
        element: <AdminEvents />,
      },
    ],
  },
]);
