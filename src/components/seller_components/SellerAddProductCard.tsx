import { ChangeEvent, useState } from "react";
import InputComponent from "../InputComponent";
import { useNavigate } from "react-router-dom";

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
  //Upload the files from the ui
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevProd) => ({ ...prevProd, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(Array.from(fileList));
    }
  };

  const validateVal = () => {
    if (!product.productName) {
      setEmptyField("productName");
      return false;
    }
    if (!product.productDescription) {
      setEmptyField("productDescription");
      return false;
    }
    if (!product.productImages) {
      setEmptyField("productImages");
      return false;
    }
    if (!product.quantity) {
      setEmptyField("quantity");
      return false;
    }
    if (!product.perUnitPrice) {
      setEmptyField("perUnitPrice");
      return false;
    }
    if (!product.unit) {
      setEmptyField("unit");
      return false;
    }

    // All validations passed
    return true;
  };

  const handleAddImage = async () => {
    try {
      const formData = new FormData();
      //formData.append("files", files); // Add files to the FormData
      // Append each file individually
      // Append all files to a single field named "files"
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("http://localhost:8080/seller/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProduct((prevProd) => ({ ...prevProd, productImages: data }));
        console.log("Successfully added the Image");
      } else {
        console.log("Failed to upload Image");
        // Handle failure
      }
    } catch (error) {
      console.error("Error during uploading image : ", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!validateVal()) {
        return;
      }

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
        navigate("/seller/home");
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
          <div className="input-group mb-3">
            <input
              type="file"
              name="files"
              onChange={handleFileChange}
              multiple
              className={`form-control ${
                emptyField === "productImages" ? "is-invalid" : ""
              }`}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleAddImage()}
            >
              Upload files
            </button>
          </div>
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
