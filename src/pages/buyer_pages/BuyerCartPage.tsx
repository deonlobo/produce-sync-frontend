import BuyerNavBar from "../../components/buyer_components/BuyerNavBar";
import CartProductComp from "../../components/buyer_components/CartProductComp";
import OrderInterface from "../../components/OrderInterface";
import "./css/BuyerCartPage.css";
import Popup from "../../components/Popup";
import { useEffect, useState } from "react";

const BuyerCartPage = () => {
  const [order, setOrder] = useState<OrderInterface>();
  const [popupConfig, setPopupConfig] = useState<{
    message: string;
    type: "success" | "failure";
  } | null>(null);

  const fetchOpenOrder = async () => {
    try {
      const response = await fetch("http://localhost:8080/buyer/cart/fetch", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data); // Update the state with the fetched order
        console.log("Order Loaded successfully");
      } else {
        console.error("Failed to fetch Order");
      }
    } catch (error) {
      console.error("Error during Order:", error);
    }
  };

  useEffect(() => {
    // This function will be called when the component mounts
    fetchOpenOrder();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleConfirmOrder = async () => {
    try {
      const response = await fetch("http://localhost:8080/buyer/cart/confirm", {
        method: "PUT",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPopupConfig({
          message:
            "Successfully Confirmed Your Order. \nYour order will be delivered Soon!!! ",
          type: "success",
        });
      } else if (response.status === 422) {
        const data = await response.json();
        const exceededProducts = data.productQtyExceeded || [];

        // Create a message for exceeded products
        const errorMessage = `Quantity exceeded for ${exceededProducts.join(
          ", "
        )}`;

        setPopupConfig({
          message: errorMessage,
          type: "failure",
        });
      } else {
        setPopupConfig({
          message: "The Order has no Products",
          type: "failure",
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during authentication:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/buyer/cart/delete/product?productId=${productId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOrder(data); // Update the state with the fetched order
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error during product deletion:", error);
    }
  };

  // Close the popup
  const closePopup = () => {
    setPopupConfig(null);
  };
  useEffect(() => {
    if (!popupConfig) {
      fetchOpenOrder(); // Call fetch order again when close
    }
  }, [popupConfig]);

  return (
    <div>
      <BuyerNavBar />
      <div className="cart-container">
        <div className="cart-actions cart-border">
          <h2>Your Cart</h2>
        </div>
        {order && (
          <div className="cart-products-container">
            {order.productList.map((product) => (
              <CartProductComp
                key={product.productId}
                product={product}
                brandName={order.brandName}
                onDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        )}
        <div className="cart-actions">
          <button className="btn btn-primary" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
      {/* Render the SuccessPopup component if popupConfig is not null */}
      {popupConfig && (
        <Popup
          onClose={closePopup}
          message={popupConfig.message}
          type={popupConfig.type}
        />
      )}
    </div>
  );
};

export default BuyerCartPage;
