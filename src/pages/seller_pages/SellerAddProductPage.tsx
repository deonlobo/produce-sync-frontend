import SellerAddProductCard from "../../components/seller_components/SellerAddProductCard";
import SellerNavBar from "../../components/seller_components/SellerNavBar";
import "./css/SellerAddProductPage.css";

const SellerAddProductPage = () => {
  return (
    <>
      <SellerNavBar />
      <div className="card-container-slr-add-prod">
        <SellerAddProductCard />
      </div>
    </>
  );
};

export default SellerAddProductPage;
