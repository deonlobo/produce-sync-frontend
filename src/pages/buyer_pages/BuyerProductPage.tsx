import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import BuyerNavBar from "../../components/buyer_components/BuyerNavBar";
import BuyerProductDescriptionCard from "../../components/buyer_components/BuyerProductDescriptionCard";
import Address from "../../components/AddressInterface";
import Cookies from "js-cookie";

interface Product {
  productId: string;
  sellerId: string;
  brandName: string;
  productName: string;
  productDescription: string;
  productImages: string[];
  quantity: number;
  perUnitPrice: number;
  unit: string;
  availableQuantity: number;
}

const BuyerProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const { productId } = useParams(); // Use useParams to get dynamic parameters from the URL
  const [sellerAddress, setSellerAddress] = useState<Address>(); // State to store seller address

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/buyer/product/details?productId=${productId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProduct(data); // Update the state with the fetched products
        console.log("Product Loaded successfully");

        // Call the API to fetch seller address
        const authToken = Cookies.get("authToken");
        const addressResponse = await fetch(
          `http://localhost:8080/buyer/product/seller/address?sellerId=${data.sellerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`, // Assuming authToken is accessible here
            },
          }
        );
        if (addressResponse.ok) {
          const addressData = await addressResponse.json();
          setSellerAddress(addressData); // Set the seller address state
          console.log("Seller Address Loaded successfully");
        } else {
          console.error("Failed to fetch seller address");
        }
      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails(); // Call the function when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <BuyerNavBar />
      <div style={{ marginTop: "2em", marginLeft: "2em", marginRight: "2em" }}>
        {product !== undefined ? (
          <BuyerProductDescriptionCard
            product={product}
            sellerAddress={sellerAddress}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BuyerProductPage;
