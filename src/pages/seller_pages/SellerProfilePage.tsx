import { useState, useEffect } from "react";
import SellerNavBar from "../../components/seller_components/SellerNavBar";
import UserProfile from "../../components/UserProfileInterface";
import Cookies from "js-cookie";

const SellerProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = Cookies.get("authToken");
        const response = await fetch("http://localhost:8080/seller/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const userProfileData = await response.json();
          setUserProfile(userProfileData);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <SellerNavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="card col-md-8 mt-4 pt-3">
            <div className="text-center">
              <h2 className="text-center">User Profile</h2>
              {userProfile ? (
                <div className="user-profile-details">
                  <p className="mb-1 mt-3">
                    <strong>Brand Name:</strong> {userProfile.brandName}
                  </p>
                  <p className="mb-1">
                    <strong>First Name:</strong> {userProfile.firstName}
                  </p>
                  <p className="mb-1">
                    <strong>Last Name:</strong> {userProfile.lastName}
                  </p>
                  <p className="mb-1">
                    <strong>Gender:</strong> {userProfile.gender}
                  </p>
                  {/* Render address details if available */}
                  {userProfile.address && (
                    <div className="mt-3">
                      <h3>Address</h3>
                      <p className="mb-1">
                        <strong>Address Line 1:</strong>{" "}
                        {userProfile.address.addressLine1}
                      </p>
                      <p className="mb-1">
                        <strong>City:</strong> {userProfile.address.city}
                      </p>
                      <p className="mb-1">
                        <strong>Province:</strong>{" "}
                        {userProfile.address.province}
                      </p>
                      <p className="mb-1">
                        <strong>Country:</strong> {userProfile.address.country}
                      </p>
                      <p className="mb-1">
                        <strong>Postal Code:</strong>{" "}
                        {userProfile.address.postalCode}
                      </p>
                    </div>
                  )}
                  <p className="mt-3 mb-3">
                    <strong>Username:</strong> {userProfile.username}
                  </p>
                </div>
              ) : (
                <p className="text-center">Loading user profile...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
