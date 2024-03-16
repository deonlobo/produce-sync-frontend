import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/icon1.png";
import "./css/SellerNavBar.css";
import Cookies from "js-cookie";

const SellerNavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("authToken"); // Remove the "authToken" cookie
    navigate("/seller/signin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm custom-seller-navbar">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="navbar-brand" to="/seller/home">
                  <img
                    src={icon}
                    alt="Logo"
                    width="40"
                    height="40"
                    className="d-inline-block align-text-top"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-css-seller-navbar"
                  aria-current="page"
                  to="/seller/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-css-seller-navbar"
                  to="/seller/newproduct"
                >
                  New Product
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-css-seller-navbar"
                  to="/seller/confirmed"
                >
                  Confirmed Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-css-seller-navbar"
                  to="/seller/delivered"
                >
                  Fulfilled Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-css-buyer-navbar"
                  aria-current="page"
                  to="/seller/profile"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-nav ml-auto">
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SellerNavBar;
