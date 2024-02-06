import { Link } from "react-router-dom";
import icon from "../../assets/icon1.png";
import "./css/SellerNavBar.css";

const SellerNavBar = () => {
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
                  className="nav-link text-css-navbar"
                  aria-current="page"
                  to="/seller/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-css-navbar"
                  to="/seller/newproduct"
                >
                  New Product
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SellerNavBar;
