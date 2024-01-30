import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";

interface prop {
  image: string;
  api: string;
  signupLink: string;
  redirectHome: string;
}

const SigninCard = ({ image, api, signupLink, redirectHome }: prop) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emptyField, setEmptyField] = useState<string | null>(null);

  const validateVal = () => {
    if (!username) {
      setEmptyField("username");
      return;
    }
    if (!password) {
      setEmptyField("password");
      return;
    }
  };

  //call the signin function from the backend and save the user token in the Cookies
  const handleSignIn = async () => {
    try {
      validateVal();
      const response = await fetch(api, {
        method: "POST", // Change the method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data" + data.token);
        // Store the authentication token using universal-cookie
        const cookies = new Cookies();
        cookies.set("authToken", data.token, {
          secure: true,
          httpOnly: false,
          sameSite: "none",
        });
        console.log("Success authentication of the user");

        // Redirect or update state based on successful authentication
        const authTokenValue = cookies.get("authToken");
        console.log("Value of authToken cookie:", authTokenValue);

        window.location.href = redirectHome;
      } else {
        console.log("Failed authentication of the user" + username + password);
        // Handle authentication failure
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during authentication:", error);
    }
  };

  return (
    <>
      <div className="card mb-3" style={{ maxWidth: "50%" }}>
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
              <div className="input-group mb-3">
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
              <div className="input-group mb-3">
                <input
                  type="password"
                  className={`form-control ${
                    emptyField === "password" ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSignIn()}
              >
                Signin
              </button>
              <p className="card-text" style={{ marginTop: "1em" }}>
                <small className="text-body-secondary">
                  Dont have an account, you can{" "}
                  <Link to={signupLink}>signup here</Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninCard;
