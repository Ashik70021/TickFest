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
import UserProfile from "../components/Pages/UserDashboard/UserProfile";
import Unauthorized from "../components/Pages/Unauthorized";
import UserTypeRedirect from "../components/UserTypeRedirect";

import PrivateRoute from "../components/PrivateRoute";
import OrganizerDashboard from "../layouts/OrganizerDashboard";
import OrganizerHome from "../components/Pages/OrganizerDashboard/OrganizerHome";
import MyEvents from "../components/Pages/OrganizerDashboard/MyEvents";
import TicketSales from "../components/Pages/OrganizerDashboard/TicketSales";
import Attendees from "../components/Pages/OrganizerDashboard/Attendees";
import Revenue from "../components/Pages/OrganizerDashboard/Revenue";
import Analytics from "../components/Pages/OrganizerDashboard/Analytics";
import OrganizerProfile from "../components/Pages/OrganizerDashboard/OrganizerProfile";
import AboutUs from "../components/Pages/AboutUs";


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
        path: "/about-us",
        element: <AboutUs></AboutUs>
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <UserTypeRedirect />
          </PrivateRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute requiredUserType="user">
            <UserProfile />
          </PrivateRoute>
        )
      },
      {
        path: "/profile-dev",
        element: <UserProfile />  // Development route without authentication
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />
      },
    ],
  },
  // Admin dashboard - Only accessible by admin users
  {
    path: "admindashboard",
    element: (
      <PrivateRoute requiredUserType="admin">
        <AdminDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "adminhome", 
        element: <AdminDashboardHome />, 
      },
      {
        path: "", 
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
  // Organizer dashboard - Only accessible by organizer users
  {
    path: "organizerdashboard",
    element: (
      <PrivateRoute requiredUserType="organizer">
        <OrganizerDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "home", 
        element: <OrganizerHome />, 
      },
      {
        path: "",
        element: <OrganizerHome />,
      },
      {
        path: "myevents",
        element: <MyEvents />,
      },
      {
        path: "tickets",
        element: <TicketSales />,
      },
      {
        path: "attendees",
        element: <Attendees />,
      },
      {
        path: "revenue",
        element: <Revenue />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "profile",
        element: <OrganizerProfile />,
      },
    ],
  },
]);
