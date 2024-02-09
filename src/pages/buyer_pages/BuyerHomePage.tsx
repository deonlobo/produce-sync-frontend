import BuyerNavBar from "../../components/buyer_components/BuyerNavBar";
import BuyerProductCard from "../../components/buyer_components/BuyerProductCard";
import DefaultImage from "../../assets/imageNotAvailable.jpg";
import "./css/BuyerHomePage.css";
import { useEffect, useState } from "react";

interface Product {
  productId: string;
  productName: string;
  productDescription: string;
  productImages: string[];
  // Add other properties as needed
}

const BuyerHome = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/buyer/nearby/seller/products",
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
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    // This function will be called when the component mounts
    fetchAllProducts();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div>
      <BuyerNavBar />
      <div className="buyer-home-pg-container">
        {products.map((product) => (
          <BuyerProductCard
            key={product.productId} // Ensure a unique key for each rendered component
            image={
              product.productImages && product.productImages.length > 0
                ? "https://storage.googleapis.com/productsync_product/" +
                  product.productImages[0]
                : DefaultImage
            }
            productName={product.productName}
            description={product.productDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default BuyerHome;
