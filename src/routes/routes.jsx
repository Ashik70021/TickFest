import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Landing from "../components/Pages/Landing";
import Events from "../components/Pages/Events";
import AdminDashboard from "../layouts/AdminDashboard";
import AdminDashboardHome from "../components/Pages/AdminDashboard/AdminDashboardHome"; 
import AdminManageEvent from "../components/Pages/AdminDashboard/AdminManageEvent";
import AdminEvents from "../components/Pages/AdminDashboard/AdminEvents";
import AdminUpdateEvent from "../components/Pages/AdminDashboard/AdminUpdateEvent";
import AdminViewEvent from "../components/Pages/AdminDashboard/AdminViewEvent";
import AdminUsers from "../components/Pages/AdminDashboard/AdminUsers";
import AdminTickets from "../components/Pages/AdminDashboard/AdminTickets";
import AdminReports from "../components/Pages/AdminDashboard/AdminReports";
import AdminProfile from "../components/Pages/AdminDashboard/AdminProfile";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import EventDetails from "../components/EventDetails/EventDetails";
import Checkout from "../components/Checkout/Checkout";
import ErrorBoundary from "../components/common/ErrorBoundary";
import AdminAnalytics from "../components/Pages/AdminDashboard/AdminAnalytics";
import Contact from "../components/Pages/Contact";
import UserProfile from "../components/Pages/UserProfile";


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
        path: "/events",
        element: <Events />,
      },
      {
        path: "/signin",
        element: <Signin></Signin>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },

      {
        path: "/events/:eventId",
        element: (
          <ErrorBoundary>
            <EventDetails />
          </ErrorBoundary>
        )
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      {
        path: "/profile",
        element: <UserProfile />
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
      {
        path: "events/edit/:id",
        element: <AdminUpdateEvent />,
      },
      {
        path: "events/view/:id",
        element: <AdminViewEvent />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "analytics",
        element: <AdminAnalytics />,
      },
      {
        path: "tickets",
        element: <AdminTickets />,
      },
      {
        path: "reports",
        element: <AdminReports />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
    ],
  },
]);
