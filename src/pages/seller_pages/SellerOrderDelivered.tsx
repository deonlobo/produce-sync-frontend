import OrderInterface from "../../components/OrderInterface";
import Cookies from "js-cookie";
import SellerNavBar from "../../components/seller_components/SellerNavBar";
import OrderItem from "../../components/seller_components/OrderItem";
import "./css/SellerOrderConfirmed.css";
import { useEffect, useState } from "react";

const SellerOrderDelivered = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const fetchOrders = async () => {
    try {
      const authToken = Cookies.get("authToken");
      const statusList = "DELIVERED";
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

  return (
    <div>
      <SellerNavBar />
      <div className="seller-order-container">
        <h2>Orders</h2>

        {orders.map((order) => (
          <OrderItem key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default SellerOrderDelivered;
