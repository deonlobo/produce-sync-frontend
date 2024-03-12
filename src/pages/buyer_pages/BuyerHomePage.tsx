import BuyerNavBar from "../../components/buyer_components/BuyerNavBar";
import BuyerProductCard from "../../components/buyer_components/BuyerProductCard";
import DefaultImage from "../../assets/imageNotAvailable.jpg";
import "./css/BuyerHomePage.css";
import { useEffect, useState } from "react";

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
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const handleSearch = () => {
    fetchProducts(searchTerm);
  };

  useEffect(() => {
    // This function will be called when the component mounts
    fetchProducts();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

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
    </div>
  );
};

export default BuyerHome;
