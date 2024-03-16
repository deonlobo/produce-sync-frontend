import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Import Bootstrap icons
import ProductInterface from "../../components/ProductInterface";
import { useNavigate } from "react-router-dom";

interface prop {
  product: ProductInterface;
}

const SellerProductDescriptionCard = ({ product }: prop) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.productImages.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const updateProductHandler = () => {
    navigate(`/seller/update/${product.productId}`);
  };

  return (
    <div className="mb-3">
      <div className="row g-0 align-items-center">
        <div className="col-md-1 text-center">
          {/* Left arrow */}
          {currentImageIndex > 0 && (
            <button
              className="btn btn-link text-dark"
              onClick={handlePreviousImage}
            >
              <BsChevronLeft size={30} />
            </button>
          )}
        </div>
        <div className="col-md-3">
          <div className="d-flex justify-content-center">
            <img
              src={`https://storage.googleapis.com/productsync_product/${product.productImages[currentImageIndex]}`}
              className="img-fluid rounded-start"
              alt={product.productName}
              style={{ minHeight: "290px" }} // Set your desired minimum height
            />
          </div>
        </div>
        <div className="col-md-1 text-center">
          {/* Right arrow */}
          {currentImageIndex < product.productImages.length - 1 && (
            <button
              className="btn btn-link text-dark"
              onClick={handleNextImage}
            >
              <BsChevronRight size={30} />
            </button>
          )}
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text mt-2">Product Id: {product.productId}</p>
            <p className="card-text">{product.productDescription}</p>
            <p className="card-text">Brand: {product.brandName}</p>
            <p className="card-text">Quantity: {product.quantity}</p>
            <p className="card-text">
              Available Quantity: {product.availableQuantity}
            </p>
            <p className="card-text">
              Price: {product.perUnitPrice} per {product.unit}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => updateProductHandler()}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductDescriptionCard;
