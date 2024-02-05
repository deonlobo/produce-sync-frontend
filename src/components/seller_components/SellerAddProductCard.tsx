import { ChangeEvent, useState } from "react";
import InputComponent from "../InputComponent";

interface ProductDocument {
  productName?: string;
  productDescription?: string;
  productImages?: string[];
  quantity?: number;
  perUnitPrice?: number;
  unit?: string;
}

const SellerAddProductCard = () => {
  const [product, setProduct] = useState<ProductDocument>({});
  const [emptyField, setEmptyField] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevProd) => ({ ...prevProd, [name]: value }));
  };

  const validateVal = () => {
    if (!product.productName) {
      setEmptyField("productName");
      return;
    }
    if (!product.productDescription) {
      setEmptyField("productDescription");
      return;
    }

    if (!product.quantity) {
      setEmptyField("quantity");
      return;
    }
    if (!product.perUnitPrice) {
      setEmptyField("perUnitPrice");
      return;
    }
    if (!product.unit) {
      setEmptyField("unit");
      return;
    }
  };
  const handleAddProduct = async () => {
    try {
      validateVal();

      const response = await fetch(
        "http://localhost:8080/seller/product/create",
        {
          method: "POST", // Change the method to POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product, null, 2),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Successfully added the product");
      } else {
        console.log(
          "Failed to add product of the user" + JSON.stringify(product, null, 2)
        );
        // Handle authentication failure
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during adding:", error);
    }
  };

  return (
    <>
      <div className="card text-center mb-3">
        <div className="card-body" style={{ margin: "0% 5% 0% 5%" }}>
          <h5 className="card-title">Add product to SELL</h5>
          <p className="card-text">We will help you sell this product</p>
          <InputComponent
            placeholder={"Product Name"}
            value={product.productName || ""}
            onSelectItem={handleInputChange}
            type="text"
            name={"productName"}
            className={`form-control ${
              emptyField === "productName" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Product Description"}
            value={product.productDescription || ""}
            onSelectItem={handleInputChange}
            type="text"
            name={"productDescription"}
            className={`form-control ${
              emptyField === "productDescription" ? "is-invalid" : ""
            }`}
          />
          {/* <InputComponent
            placeholder={"Address Line 1"}
            value={product.productImages || ""}
            onSelectItem={handleCountryChange}
            type="text"
            name={"addressLine1"}
            className={`form-control ${
              emptyField === "addressLine1" ? "is-invalid" : ""
            }`}
          /> */}
          <InputComponent
            placeholder={"Quantity"}
            value={
              product.quantity !== undefined ? product.quantity.toString() : ""
            }
            onSelectItem={handleInputChange}
            type="text"
            name={"quantity"}
            className={`form-control ${
              emptyField === "quantity" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Per Unit Price"}
            value={
              product.perUnitPrice !== undefined
                ? product.perUnitPrice.toString()
                : ""
            }
            onSelectItem={handleInputChange}
            type="text"
            name={"perUnitPrice"}
            className={`form-control ${
              emptyField === "perUnitPrice" ? "is-invalid" : ""
            }`}
          />
          <InputComponent
            placeholder={"Unit"}
            value={product.unit || ""}
            onSelectItem={handleInputChange}
            type="text"
            name={"unit"}
            className={`form-control ${
              emptyField === "unit" ? "is-invalid" : ""
            }`}
          />

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleAddProduct()}
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
};

export default SellerAddProductCard;
