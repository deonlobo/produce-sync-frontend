import BuyerNavBar from "../../components/buyer_components/BuyerNavBar";
import BuyerProductCard from "../../components/buyer_components/BuyerProductCard";
import DefaultImage from "../../assets/imageNotAvailable.jpg";
import "./css/BuyerHomePage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Popup from "../../components/Popup";

interface Product {
  productId: string;
  productName: string;
  brandName: string;
  productDescription: string;
  productImages: string[];
  perUnitPrice: number;
  // Add other properties as needed
}

const BuyerHome = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { authToken } = useParams(); // Use useParams to get dynamic parameters from the URL
  const navigate = useNavigate();
  const [popupConfig, setPopupConfig] = useState<{
    message: string;
    type: "success" | "failure";
    buttonName: string;
  } | null>(null);

  const fetchProducts = async (search = "") => {
    try {
      const response = await fetch(
        `http://localhost:8080/buyer/nearby/seller/products?search=${search}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
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

  const handleSearch = () => {
    fetchProducts(searchTerm);
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
    fetchProducts();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  // Close the popup
  const closePopup = () => {
    navigate("/buyer/signin");
  };

  return (
    <div>
      <BuyerNavBar />
      <div className="buyer-home-pg-search">
        <div className="input-group" style={{ width: "50%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon1"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="buyer-home-pg-container">
        {products.map((product) => (
          <BuyerProductCard
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

export default BuyerHome;
