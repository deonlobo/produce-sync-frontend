import BuyerSignupCard from "../../components/buyer_components/BuyerSignupCard";
import "./css/BuyerSignupPage.css";
import smallscaleImage from "../../assets/buyerBackground.jpg";
import InitialNavBar from "../../components/InitialNavBar";

const BuyerSignupPage = () => {
  return (
    <>
      <InitialNavBar />
      <div className="byr-signup-page-container">
        <div className="card-container-byr-signup-1">
          <img
            src={smallscaleImage}
            className="img-fluid byr-signup-fade-image"
            alt="..."
          />
          <div className="card-container-byr-signup-2">
            <BuyerSignupCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerSignupPage;
