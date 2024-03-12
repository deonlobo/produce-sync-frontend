import { Link } from "react-router-dom";
import icon from "../../assets/icon1.png";
import "./css/BuyerNavBar.css";

const BuyerNavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm custom-buyer-navbar">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="navbar-brand" to="/buyer/home">
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
                  className="nav-link text-css-buyer-navbar"
                  aria-current="page"
                  to="/buyer/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-css-buyer-navbar"
                  aria-current="page"
                  to="/buyer/cart"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BuyerNavBar;
