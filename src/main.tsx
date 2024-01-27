import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./pages/LandingPage";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SellerSignupPage from "./pages/SellerSignupPage";
import SellerSigninPage from "./pages/SellerSigninPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/seller/signin",
    element: <SellerSigninPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
