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
import SuccessfulSigninUp from "./pages/SuccessfulSigninUp";
import SellerProductPage from "./pages/seller_pages/SellerProductPage";
import SellerUpdateProductCard from "./components/seller_components/SellerUpdateProductCard";
import SellerUpdateProductPage from "./pages/seller_pages/SellerUpdateProductPage";
import SellerOrderDelivered from "./pages/seller_pages/SellerOrderDelivered";
import SellerOrderConfirmed from "./pages/seller_pages/SellerOrderConfirmed";
import BuyerProfilePage from "./pages/buyer_pages/BuyerProfilePage";
import SellerProfilePage from "./pages/seller_pages/SellerProfilePage";

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
    path: "/user/success",
    element: <SuccessfulSigninUp />,
  },
  {
    path: "/seller/home/:authToken?",
    element: <SellerHomePage />,
  },
  {
    path: "/seller/newproduct",
    element: <SellerAddProductPage />,
  },
  {
    path: "/seller/product/:productId?",
    element: <SellerProductPage />,
  },
  {
    path: "/seller/update/:productId?",
    element: <SellerUpdateProductPage />,
  },
  {
    path: "/seller/confirmed",
    element: <SellerOrderConfirmed />,
  },
  {
    path: "/seller/delivered",
    element: <SellerOrderDelivered />,
  },
  {
    path: "/seller/profile",
    element: <SellerProfilePage />,
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
    path: "/buyer/home/:authToken?",
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
  {
    path: "/buyer/profile",
    element: <BuyerProfilePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
