import sellerImg from "../assets/seller.jpg";
import buyerImg from "../assets/buyer.png";
import "./LandingPange.css";
import SigninSignupRedirectCard from "../components/SigninSignupRedirectCard";
//This page will contain link to signin or signup of seller or buyer
function LandingPage() {
  return (
    <div className="card-container">
      <SigninSignupRedirectCard
        userType="Seller"
        image={sellerImg}
        details="Unlock unbeatable deals for your produce! Sign in or sign up now to start selling and maximize your returns."
        buttonName="Signin/Signup"
        signInLink="/seller/signin"
      />
      <SigninSignupRedirectCard
        userType="Buyer"
        image={buyerImg}
        details="Shop local with ease! Sign in or sign up for exclusive deals and lightning-fast delivery. Connect with nearby top-rated vendors for the best buying experience."
        buttonName="Signin/Signup"
        signInLink="/seller/signin"
      />
    </div>
  );
}

export default LandingPage;
