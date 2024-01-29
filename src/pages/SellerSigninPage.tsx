import SigninCard from "../components/SigninCard";
import sellerSigninImage from "../assets/sellerSignin.png";
import "./css/sellerSigninPage.css";
import InitialNavBar from "../components/InitialNavBar";
import smallscaleImage from "../assets/smallscale.jpg";

const SellerSigninPage = () => {
  return (
    <>
      <InitialNavBar />
      <div className="signin-page-container">
        <div className="card-container-signin-1">
          <img
            src={smallscaleImage}
            className="img-fluid signin-fade-image"
            alt="..."
          />
          <div className="card-container-signin-2">
            <SigninCard
              image={sellerSigninImage}
              api="http://localhost:8080/api/v1/auth/login"
              signupLink="/seller/signup"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSigninPage;
