import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/Banner";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Banner></Banner>
        }
      ]
    },
  ]);