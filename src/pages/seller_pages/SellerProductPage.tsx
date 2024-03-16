import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import SellerNavBar from "../../components/seller_components/SellerNavBar";
import ProductInterface from "../../components/ProductInterface";
import SellerProductDescriptionCard from "../../components/seller_components/SellerProductDescriptionCard";

const SellerProductPage = () => {
  const [product, setProduct] = useState<ProductInterface>();
  const { productId } = useParams(); // Use useParams to get dynamic parameters from the URL

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/seller/product/details?productId=${productId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProduct(data); // Update the state with the fetched products
        console.log("Product Loaded successfully");
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
      <SellerNavBar />
      <div style={{ marginTop: "2em", marginLeft: "2em", marginRight: "2em" }}>
        {product !== undefined ? (
          <SellerProductDescriptionCard product={product} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SellerProductPage;
