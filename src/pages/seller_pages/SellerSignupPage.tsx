import SellerSignupCard from "../../components/seller_components/SellerSignupCard";
import "./css/SellerSignupPage.css";
import smallscaleImage from "../../assets/smallscale.jpg";
import InitialNavBar from "../../components/InitialNavBar";

const SellerSignupPage = () => {
  return (
    <>
      <InitialNavBar />
      <div className="signup-page-container">
        <div className="card-container-signup-1">
          <img
            src={smallscaleImage}
            className="img-fluid signup-fade-image"
            alt="..."
          />
          <div className="card-container-signup-2">
            <SellerSignupCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSignupPage;
