import SigninCard from "../../components/SigninCard";
import buyerSigninImage from "../../assets/buyerSignin.jpeg";
import "./css/BuyerSigninPage.css";
import InitialNavBar from "../../components/InitialNavBar";
import smallscaleImage from "../../assets/buyerBackground.jpg";

const BuyerSigninPage = () => {
  return (
    <>
      <InitialNavBar />
      <div className="buyer-signin-page-container">
        <div className="card-container-buyer-signin-1">
          <img
            src={smallscaleImage}
            className="img-fluid buyer-signin-fade-image"
            alt="..."
          />
          <div className="card-container-buyer-signin-2">
            <h1 className="text-css-buyer">Hello Buyer</h1>
            <SigninCard
              image={buyerSigninImage}
              api="http://localhost:9090/api/v1/auth/buyer/login"
              authApi="http://localhost:8080/buyer/authenticate"
              signupLink="/buyer/signup"
              redirectHome="/buyer/home"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerSigninPage;
