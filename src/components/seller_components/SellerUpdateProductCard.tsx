import React, { ChangeEvent, useEffect, useState } from "react";
import ProductInterface from "../ProductInterface";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../InputComponent";
import Cookies from "js-cookie";

interface ProductDocument {
  productId?: string;
  productName?: string;
  productDescription?: string;
  productImages?: string[];
  quantity?: number;
  perUnitPrice?: number;
  unit?: string;
}

const SellerUpdateProductCard = () => {
  const [product, setProduct] = useState<ProductDocument>({});
  const { productId } = useParams(); // Use useParams to get dynamic parameters from the URL
  const [emptyField, setEmptyField] = useState<string | null>(null);

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

        predictImagePrice();
      } else {
        console.log("Failed to upload Image");
        // Handle failure
      }
    } catch (error) {
      console.error("Error during uploading image : ", error);
    }
  };

  const predictImagePrice = async () => {
    // Predict if the image is of tomato
    if (
      product.productName &&
      product.productName.toLowerCase().includes("tomato")
    ) {
      const formDataPredict = new FormData();
      formDataPredict.append("image", files[0]);

      try {
        const predictionRes = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formDataPredict,
        });

        if (predictionRes.ok) {
          const predictionData = await predictionRes.json();
          console.log("Successfully Predicted", predictionData);

          // Assuming predictionData is a JSON object with keys "price_segmentation" and "unit"
          setProduct((prevProd) => ({
            ...prevProd,
            perUnitPrice: predictionData.price_segmentation,
            unit: predictionData.unit,
          }));
        } else {
          console.error("Prediction failed:", predictionRes.statusText);
        }
      } catch (error) {
        console.error("Error occurred during prediction:", error);
      }
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!validateVal()) {
        return;
      }

      const authToken = Cookies.get("authToken");
      const response = await fetch(
        "http://localhost:8080/seller/product/update",
        {
          method: "PUT", // Change the method to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(product, null, 2),
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("Successfully added the product");
        navigate(`/seller/product/${productId}`);
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
            onClick={() => handleUpdateProduct()}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default SellerUpdateProductCard;
