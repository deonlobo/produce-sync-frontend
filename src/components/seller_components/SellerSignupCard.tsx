import { ChangeEvent, useState } from "react";
import InputComponent from "../InputComponent";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface Address {
  addressLine1?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
}

interface UserDocument {
  firstName?: string;
  lastName?: string;
  gender?: string;
  address?: Address;
  username?: string;
  password?: string;
}

const SellerSignupCard = () => {
  const [user, setUser] = useState<UserDocument>({});
  const [emptyField, setEmptyField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: { ...prevUser.address, [name]: value },
    }));
  };

  const validateVal = () => {
    if (!user.firstName) {
      setEmptyField("firstName");
      return;
    }
    if (!user.lastName) {
      setEmptyField("lastName");
      return;
    }
    if (!user.gender) {
      setEmptyField("gender");
      return;
    }
    if (!user.address?.addressLine1) {
      setEmptyField("addressLine1");
      return;
    }
    if (!user.address?.city) {
      setEmptyField("city");
      return;
    }
    if (!user.address?.province) {
      setEmptyField("province");
      return;
    }
    if (!user.address?.country) {
      setEmptyField("country");
      return;
    }
    if (!user.address?.postalCode) {
      setEmptyField("postalCode");
      return;
    }
    if (!user.username) {
      setEmptyField("username");
      return;
    }
    if (!user.password) {
      setEmptyField("password");
      return;
    }
  };
  const handleSignUp = async () => {
    try {
      validateVal();

      const response = await fetch(
        "http://localhost:8080/api/v1/auth/seller/create",
        {
          method: "POST", // Change the method to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user, null, 2),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Store the authentication token in a secure cookie
        Cookies.set("authToken", data.token, {
          secure: true,
          httpOnly: false,
          sameSite: "none",
          path: "/",
        });
        console.log("Success authentication of the user");
        // Redirect or update state based on successful authentication
        // Log the value of the authToken cookie
        const authTokenValue = Cookies.get("authToken");
        console.log("Value of authToken cookie:", authTokenValue);
        navigate("/seller/home");
      } else {
        console.log(
          "Failed authentication of the user" + JSON.stringify(user, null, 2)
        );
        // Handle authentication failure
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during authentication:", error);
    }
  };

  return (
    <>
      <div className="card text-center mb-3">
        <div className="card-body" style={{ margin: "0% 5% 0% 5%" }}>
          <h5 className="card-title">Signup as a Seller</h5>
          <p className="card-text">
            Signup and be a part of our team of authentic sellers
          </p>
          <InputComponent
            placeholder={"First Name"}
            value={user.firstName || ""}
            onSelectItem={handleInputChange}
            type="text"
            name={"firstName"}
            className={`form-control ${
              emptyField === "firstName" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Last Name"}
            value={user.lastName || ""}
            onSelectItem={handleInputChange}
            type="text"
            name={"lastName"}
            className={`form-control ${
              emptyField === "lastName" ? "is-invalid" : ""
            }`}
          />
          <div className="input-group mb-3">
            <select
              className={`form-control ${
                emptyField === "gender" ? "is-invalid" : ""
              }`}
              aria-label={"Gender"}
              name={"gender"}
              value={user.gender || ""}
              onChange={handleSelectChange}
            >
              <option value={user.gender || ""} disabled>
                {user.gender || "Select Gender"}
              </option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>
          <InputComponent
            placeholder={"Address Line 1"}
            value={user.address?.addressLine1 || ""}
            onSelectItem={handleCountryChange}
            type="text"
            name={"addressLine1"}
            className={`form-control ${
              emptyField === "addressLine1" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"City"}
            value={user.address?.city || ""}
            onSelectItem={handleCountryChange}
            type="text"
            name={"city"}
            className={`form-control ${
              emptyField === "city" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Province"}
            value={user.address?.province || ""}
            onSelectItem={handleCountryChange}
            type="text"
            name={"province"}
            className={`form-control ${
              emptyField === "province" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Country"}
            value={user.address?.country || ""}
            onSelectItem={handleCountryChange}
            type="text"
            name={"country"}
            className={`form-control ${
              emptyField === "country" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Postal Code"}
            value={user.address?.postalCode || ""}
            onSelectItem={handleCountryChange}
            type="text"
            name={"postalCode"}
            className={`form-control ${
              emptyField === "postalCode" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"User Name"}
            value={user.username || ""}
            onSelectItem={handleInputChange}
            type="text"
            name={"username"}
            className={`form-control ${
              emptyField === "username" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Password"}
            value={user.password || ""}
            onSelectItem={handleInputChange}
            type="password"
            name={"password"}
            className={`form-control ${
              emptyField === "password" ? "is-invalid" : ""
            }`}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSignUp()}
          >
            Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default SellerSignupCard;
