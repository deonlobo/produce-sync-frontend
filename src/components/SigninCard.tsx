import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Popup from "./Popup";
import LoadingSpinner from "./LoadingSpinner";

interface prop {
  image: string;
  api: string;
  authApi: string;
  signupLink: string;
  redirectHome: string;
}

const SigninCard = ({
  image,
  api,
  authApi,
  signupLink,
  redirectHome,
}: prop) => {
  const [username, setUsername] = useState("");
  const [emptyField, setEmptyField] = useState<string | null>(null);
  const navigate = useNavigate();
  const [popupConfig, setPopupConfig] = useState<{
    message: string;
    type: "success" | "failure";
    buttonName: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  const validateVal = () => {
    if (!username) {
      setEmptyField("username");
      return;
    }
  };

  //call the signin function from the backend and save the user token in the Cookies
  const authenticateToken = async () => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.log("Token does not exist");
      // If token is not valid then call handleSignIn
      handleSignIn();
    } else {
      try {
        validateVal();

        const authToken = Cookies.get("authToken");
        const response = await fetch(authApi, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain", // Assuming the body is a string
            Authorization: `Bearer ${authToken}`,
          },
          body: username,
        });

        if (response.ok) {
          const data = await response.text();
          console.log("Success authentication of the user");

          navigate(redirectHome);
        } else {
          console.log("Token is not valid " + username);
          // If token is not valid then call handleSignIn
          handleSignIn();
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error during authentication:", error);
      }
    }
  };

  //call the signin function from the backend and save the user token in the Cookies
  const handleSignIn = async () => {
    try {
      validateVal();
      setIsLoading(true);
      const response = await fetch(api, {
        method: "POST", // Change the method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });
      setIsLoading(false);
      if (response.ok) {
        //Email is sent successfully
        const data = await response.text();
        navigate("/user/success");
      } else if (response.status === 409) {
        console.log("Failed authentication of the user" + username);
        // Handle authentication failure
        const data = await response.text();
        setPopupConfig({
          message: data,
          type: "failure",
          buttonName: "Close",
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during authentication:", error);
    }
  };

  // Close the popup
  const closePopup = () => {
    setPopupConfig(null);
  };

  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "50%" }}>
        {/* Show loading spinner if isLoading is true */}
        {isLoading && <LoadingSpinner />}
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={image}
              className="img-fluid w-100 rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Signin</h5>
              <div className="input-group mb-3 mt-3">
                <input
                  type="text"
                  className={`form-control ${
                    emptyField === "username" ? "is-invalid" : ""
                  }`}
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => authenticateToken()}
              >
                Signin
              </button>
              <p className="card-text" style={{ marginTop: "3em" }}>
                <small className="text-body-secondary">
                  Dont have an account, you can{" "}
                  <Link to={signupLink}>signup here</Link>
                </small>
              </p>
            </div>
          </div>
        </div>
        {/* Render the SuccessPopup component if popupConfig is not null */}
        {popupConfig && (
          <Popup
            onClose={closePopup}
            message={popupConfig.message}
            type={popupConfig.type}
            primaryButtonName={popupConfig.buttonName}
          />
        )}
      </div>
    </>
  );
};

export default SigninCard;
