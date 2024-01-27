import SigninCard from "../components/SigninCard";
import sellerSigninImage from "../assets/sellerSignin.png";
import "./sellerSigninPage.css";

const SellerSigninPage = () => {
  return (
    <div className="card-container">
      <SigninCard image={sellerSigninImage} />
    </div>
  );
};

export default SellerSigninPage;
