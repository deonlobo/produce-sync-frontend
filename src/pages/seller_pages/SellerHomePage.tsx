import SellerNavBar from "../../components/seller_components/SellerNavBar";
import SellerProductCard from "../../components/seller_components/SellerProductCard";
import DefaultImage from "../../assets/imageNotAvailable.jpg";
import "./css/SellerHomePage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from "../../components/Popup";
import ProductInterface from "../../components/ProductInterface";

const SellerHome = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const { authToken } = useParams(); // Use useParams to get dynamic parameters from the URL
  const navigate = useNavigate();
  const [popupConfig, setPopupConfig] = useState<{
    message: string;
    type: "success" | "failure";
    buttonName: string;
  } | null>(null);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/seller/product/fetch",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Update the state with the fetched products
        console.log("Products Loaded successfully");
      } else {
        console.error("Failed to fetch products");
        setPopupConfig({
          message: "Authentication failed please login",
          type: "failure",
          buttonName: "Login",
        });
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      // Set the authToken in the Cookies
      Cookies.set("authToken", authToken, {
        expires: 10, // Expires in 10 days
        secure: true,
        httpOnly: false,
        sameSite: "none",
        path: "/",
      });
    }
    // This function will be called when the component mounts
    fetchAllProducts();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  // Close the popup
  const closePopup = () => {
    navigate("/seller/signin");
  };

  return (
    <div>
      <SellerNavBar />
      <div className="seller-home-pg-container">
        {products.map((product) => (
          <SellerProductCard
            key={product.productId} // Ensure a unique key for each rendered component
            productId={product.productId}
            image={
              product.productImages && product.productImages.length > 0
                ? "https://storage.googleapis.com/productsync_product/" +
                  product.productImages[0]
                : DefaultImage
            }
            productName={product.productName}
            description={product.productDescription}
            perUnitPrice={product.perUnitPrice}
            brandName={product.brandName}
          />
        ))}
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
  );
};

export default SellerHome;
