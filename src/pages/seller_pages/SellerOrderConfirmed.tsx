import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import OrderItem from "../../components/seller_components/OrderItem";
import OrderInterface from "../../components/OrderInterface";
import SellerNavBar from "../../components/seller_components/SellerNavBar";
import "./css/SellerOrderConfirmed.css";

const SellerOrderConfirmed = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const fetchOrders = async () => {
    try {
      const authToken = Cookies.get("authToken");
      const statusList = "CONFIRMED";
      const response = await fetch(
        `http://localhost:8080/seller/orders?status=${statusList}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        const ordersData = await response.json();
        setOrders(ordersData);
      } else {
        // Handle error
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array to run the effect only once

  const onDeliveredHandler = async (orderId: string) => {
    try {
      const authToken = Cookies.get("authToken");
      const response = await fetch(
        "http://localhost:8080/seller/order/status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ status: "DELIVERED", orderId: orderId }),
        }
      );
      if (response.ok) {
        console.log("Order status updated to DELIVERED");
        fetchOrders();
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <SellerNavBar />
      <div className="seller-order-container">
        <h2>Orders</h2>

        {orders.map((order) => (
          <OrderItem
            key={order.orderId}
            order={order}
            onClick={() => onDeliveredHandler(order.orderId)}
          />
        ))}
      </div>
    </div>
  );
};

export default SellerOrderConfirmed;
