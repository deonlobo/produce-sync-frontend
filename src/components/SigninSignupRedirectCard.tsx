import { Link } from "react-router-dom";

interface prop {
  userType: string;
  image: string;
  details: string;
  buttonName: string;
  signInLink: string;
}

const SigninSignupRedirectCard = ({
  userType,
  image,
  details,
  buttonName,
  signInLink,
}: prop) => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{userType}</h5>
          <p className="card-text">{details}</p>
          <Link className="btn btn-primary" to={signInLink}>
            {buttonName}
          </Link>
        </div>
      </div>
    </>
  );
};

export default SigninSignupRedirectCard;
