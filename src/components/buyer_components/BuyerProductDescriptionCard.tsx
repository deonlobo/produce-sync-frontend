import { ChangeEvent, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"; // Import Bootstrap icons
import Popup from "../Popup";
import Cookies from "js-cookie";
import Address from "../AddressInterface";

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

interface prop {
  product: Product;
  sellerAddress?: Address;
}

interface OrderProduct {
  productId?: string;
  quantity?: number;
}

const BuyerProductDescriptionCard = ({ product, sellerAddress }: prop) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [orderProduct, setOrderProduct] = useState<OrderProduct>({});
  const [emptyField, setEmptyField] = useState<string | null>(null);
  const [popupConfig, setPopupConfig] = useState<{
    message: string;
    type: "success" | "failure";
    secondaryButtonName?: string;
  } | null>(null);
  const addressLines = [];
  if (sellerAddress?.addressLine1)
    addressLines.push(sellerAddress.addressLine1);
  addressLines.push(
    `${sellerAddress?.city ? `${sellerAddress.city}` : ""}${
      sellerAddress?.province ? `, ${sellerAddress.province} ` : ""
    }`
  );
  addressLines.push(
    `${sellerAddress?.country ? `${sellerAddress.country} ` : ""}${
      sellerAddress?.postalCode ? `- ${sellerAddress.postalCode}` : ""
    }`
  );

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < product.productImages.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrderProduct((prevProd) => ({
      ...prevProd,
      [name]: value,
      productId: product.productId,
    }));
  };
  const validateVal = () => {
    if (!orderProduct.quantity) {
      setEmptyField("quantity");
      return;
    }
  };

  const checkCartValid = async () => {
    try {
      const authToken = Cookies.get("authToken");
      const response = await fetch(
        "http://localhost:8080/buyer/cart/product/valid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Assuming authToken is accessible here
          },
          body: JSON.stringify(orderProduct),
        }
      );

      if (response.ok) {
        const isValid = await response.json();
        if (isValid) {
          addToCartHandler();
        } else {
          // Handle case when product is not valid
          setPopupConfig({
            message:
              "Products in the Cart are of different seller. Are you sure you want to replace the products?",
            type: "failure",
            secondaryButtonName: "Add",
          });
        }
      } else {
        // Handle other response status codes
        setPopupConfig({
          message: "Failed to validate product",
          type: "failure",
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error validating product:", error);
      setPopupConfig({
        message: "Error validating product",
        type: "failure",
      });
    }
  };

  const addToCartHandler = async () => {
    try {
      validateVal();
      const response = await fetch("http://localhost:8080/buyer/cart/add", {
        method: "POST", // Change the method to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderProduct, null, 2),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPopupConfig({
          message: "Successfully added to cart!",
          type: "success",
        });
      } else if (response.status === 422) {
        setPopupConfig({
          message:
            "The total quantity of this product exceeds the available quantity",
          type: "failure",
        });
      } else {
        setPopupConfig({
          message: "Failed to add product to cart",
          type: "failure",
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
            <h5 className="card-title mb-3">{product.productName}</h5>
            <p className="card-text mb-1">{product.productDescription}</p>
            <p className="card-text mb-1">
              Available Quantity: {product.availableQuantity}
            </p>
            <p className="card-text">
              <h6>
                Price: {product.perUnitPrice} per {product.unit}
              </h6>
            </p>
            <p className="card-text">Brand: {product.brandName}</p>
            <div>
              <h6>Address:</h6>
              {addressLines.map((line, index) => (
                <p key={index} style={{ marginBottom: "0px" }}>
                  {line}
                </p>
              ))}
            </div>
            <div className="input-group mt-3 mb-3">
              <input
                type="number"
                className={`form-control ${
                  emptyField === "quantity" ? "is-invalid" : ""
                }`}
                placeholder={"Quantity"}
                aria-label={"Quantity"}
                aria-describedby="basic-addon1"
                name={"quantity"}
                value={orderProduct.quantity}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => checkCartValid()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* Render the SuccessPopup component if popupConfig is not null */}
      {popupConfig && (
        <Popup
          onClose={closePopup}
          onSecondaryAction={addToCartHandler}
          message={popupConfig.message}
          type={popupConfig.type}
          secondaryButtonName={popupConfig.secondaryButtonName}
        />
      )}
    </div>
  );
};

export default BuyerProductDescriptionCard;
