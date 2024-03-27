import { ChangeEvent, useState } from "react";
import InputComponent from "../InputComponent";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import LoadingSpinner from "../LoadingSpinner";

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
}

const BuyerSignupCard = () => {
  const [user, setUser] = useState<UserDocument>({});
  const [emptyField, setEmptyField] = useState<string | null>(null);
  const navigate = useNavigate();
  const [popupConfig, setPopupConfig] = useState<{
    message: string;
    type: "success" | "failure";
    action: () => void;
    buttonName: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

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
  };
  const handleSignUp = async () => {
    try {
      validateVal();

      setIsLoading(true);
      const response = await fetch(
        "http://localhost:9090/api/v1/auth/buyer/create",
        {
          method: "POST", // Change the method to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user, null, 2),
        }
      );
      setIsLoading(false);

      if (response.ok) {
        const data = await response.text();

        // Store the authentication token in a secure cookie
        // Cookies.set("authToken", data.token, {
        //   secure: true,
        //   httpOnly: false,
        //   sameSite: "none",
        //   path: "/",
        // });
        console.log("Token sent successfully" + data);
        // Redirect or update state based on successful authentication
        // Log the value of the authToken cookie
        // const authTokenValue = Cookies.get("authToken");
        // console.log("Value of authToken cookie:", authTokenValue);
        navigate("/user/success");
      } else if (response.status === 409) {
        const data = await response.text();
        setPopupConfig({
          message: data,
          type: "failure",
          action: directLoginPage,
          buttonName: "Login",
        });
      } else {
        const data = await response.text();
        setPopupConfig({
          message: data,
          type: "failure",
          action: closePopup,
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

  // direct the user to the login page
  const directLoginPage = () => {
    navigate("/buyer/signin");
  };

  return (
    <>
      <div className="card text-center mb-3">
        {/* Show loading spinner if isLoading is true */}
        {isLoading && <LoadingSpinner />}
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
            placeholder={"Email"}
            value={user.username || ""}
            onSelectItem={handleInputChange}
            type="text"
            name={"username"}
            className={`form-control ${
              emptyField === "username" ? "is-invalid" : ""
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
        {/* Render the SuccessPopup component if popupConfig is not null */}
        {popupConfig && (
          <Popup
            onClose={popupConfig.action}
            message={popupConfig.message}
            type={popupConfig.type}
            primaryButtonName={popupConfig.buttonName}
          />
        )}
      </div>
    </>
  );
};

export default BuyerSignupCard;
