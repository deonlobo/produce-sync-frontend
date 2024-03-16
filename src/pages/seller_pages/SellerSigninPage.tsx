import SigninCard from "../../components/SigninCard";
import sellerSigninImage from "../../assets/sellerSignin.png";
import "./css/sellerSigninPage.css";
import InitialNavBar from "../../components/InitialNavBar";
import smallscaleImage from "../../assets/smallscale.jpg";

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
            <h1 className="text-css-buyer">Hello Seller</h1>
            <SigninCard
              image={sellerSigninImage}
              api="http://localhost:9090/api/v1/auth/seller/login"
              authApi="http://localhost:8080/seller/authenticate"
              signupLink="/seller/signup"
              redirectHome="/seller/home"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSigninPage;
