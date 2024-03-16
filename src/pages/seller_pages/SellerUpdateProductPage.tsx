import React from "react";
import SellerNavBar from "../../components/seller_components/SellerNavBar";
import "./css/SellerAddProductPage.css";
import SellerUpdateProductCard from "../../components/seller_components/SellerUpdateProductCard";

const SellerUpdateProductPage = () => {
  return (
    <>
      <SellerNavBar />
      <div className="card-container-slr-add-prod">
        <SellerUpdateProductCard />
      </div>
    </>
  );
};

export default SellerUpdateProductPage;
