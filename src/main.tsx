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
import SellerAddProductPage from "./pages/seller_pages/SellerAddProductPage";
import BuyerProductPage from "./pages/buyer_pages/BuyerProductPage";
import BuyerCartPage from "./pages/buyer_pages/BuyerCartPage";

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
    path: "/seller/newproduct",
    element: <SellerAddProductPage />,
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
  {
    path: "/buyer/product/:productId", // Use a colon to indicate a dynamic parameter
    element: <BuyerProductPage />,
  },
  {
    path: "/buyer/cart",
    element: <BuyerCartPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
