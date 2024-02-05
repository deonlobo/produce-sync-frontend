import SellerNavBar from "../../components/seller_components/SellerNavBar";
import SellerProductCard from "../../components/seller_components/SellerProductCard";
import DefaultImage from "../../assets/imageNotAvailable.jpg";
import "./css/SellerHomePage.css";

const SellerHome = () => {
  return (
    <div>
      <SellerNavBar />
      <div className="seller-home-pg-container">
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
        <SellerProductCard
          image={DefaultImage}
          productName={"Banana"}
          description={"Some quick example text to build on the card title and"}
        />
      </div>
    </div>
  );
};

export default SellerHome;
