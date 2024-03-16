import React from "react";
import OrderInterface from "../OrderInterface";
import "./css/OrderItem.css";

interface prop {
  order: OrderInterface;
  onClick?: () => void; // Function to handle delivered action (optional)
}

const OrderItem = ({ order, onClick }: prop) => {
  console.log("Order Details:", order);
  const addressLines = [];
  if (order.buyerName) addressLines.push(order.buyerName);
  if (order.address?.addressLine1)
    addressLines.push(order.address.addressLine1);
  addressLines.push(
    `${order.address?.city ? `${order.address.city}` : ""}${
      order.address?.province ? `, ${order.address.province} ` : ""
    }`
  );
  addressLines.push(
    `${order.address?.country ? `${order.address.country} ` : ""}${
      order.address?.postalCode ? `- ${order.address.postalCode}` : ""
    }`
  );
  return (
    <div style={{ width: "100%" }}>
      {/* Add more details as needed */}
      <div className="card" style={{ margin: "1em 15em", padding: "1em 3em" }}>
        <div className="card-body">
          <h5 className="card-title">Order ID: {order.orderId}</h5>
          <p className="card-text mar-bt-0">Status: {order.status}</p>
          <p className="card-text border-bt-oi mar-bt-0">
            Order Total: ${order.orderTotal}
          </p>
          {/* Render address details */}
          <div className="border-bt-oi mt-2">
            <h6>Address:</h6>
            {addressLines.map((line, index) => (
              <p key={index} className="mar-bt-0">
                {line}
              </p>
            ))}
          </div>
          {/* Render product details */}
          <div className="mt-2">
            <h6>Products:</h6>
            {order.productList.map((product, index) => (
              <div
                key={product.productId}
                className={
                  index === order.productList.length - 1 ? "" : "border-bt-oi"
                }
              >
                <p className="mar-bt-0">Product Id: {product.productId}</p>
                <p className="mar-bt-0">Product Name: {product.productName}</p>
                <p className="mar-bt-0">
                  Price: ${product.perUnitPrice.toFixed(2)} per {product.unit}
                </p>
                <p className="mar-bt-0">Quantity: {product.quantity}</p>
                <p>Product Total: {product.total}</p>
              </div>
            ))}
          </div>
          {/* Conditionally render the Delivered button if the onDelivered function is provided */}
          {onClick && (
            <a href="#" className="btn btn-primary mt-2" onClick={onClick}>
              Delivered
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
