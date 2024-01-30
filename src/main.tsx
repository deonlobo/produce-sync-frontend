import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./pages/LandingPage";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SellerSignupPage from "./pages/seller_pages/SellerSignupPage";
import SellerSigninPage from "./pages/seller_pages/SellerSigninPage";
import SellerHomePage from "./pages/seller_pages/SellerHomePage";
import BuyerSigninPage from "./pages/buyer_pages/BuyerSigninPage";
import BuyerSignupPage from "./pages/buyer_pages/BuyerSignupPage";
import BuyerHomePage from "./pages/buyer_pages/BuyerHomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/seller/signin",
    element: <SellerSigninPage />,
  },
  {
    path: "/seller/signup",
    element: <SellerSignupPage />,
  },
  {
    path: "/seller/home",
    element: <SellerHomePage />,
  },
  {
    path: "/buyer/signin",
    element: <BuyerSigninPage />,
  },
  {
    path: "/buyer/signup",
    element: <BuyerSignupPage />,
  },
  {
    path: "/buyer/home",
    element: <BuyerHomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
