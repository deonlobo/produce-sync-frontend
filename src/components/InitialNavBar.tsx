import { Link } from "react-router-dom";
import icon from "../assets/icon1.png";

const InitialNavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="navbar-brand" to="/">
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/seller/signin">
                  Seller
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default InitialNavBar;
