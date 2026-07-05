import { useState } from "react";
import "./orders.scss";
import { orders as initialOrders } from "../../data/ordersData.js";
import { OrderModal } from "../../components/orderModal/OrderModal.jsx";

export const Orders = () => {

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Open modal only for OPEN orders
  const handleOrderClick = (order) => {
    if(order.status !== "OPEN") return;

    setSelectedOrder({
      ...order,
      quantity: order.quantity,
    });
  }

  const closeModal = () => {
    setSelectedOrder(null);
  }

  // Modify order
  const handleModifyOrder = (updatedOrder) => {
    setOrders((prev) => 
      prev.map((order) => 
        order.id === updatedOrder.id
          ? {
              ...order,
              quantity: updatedOrder.quantity,
              price: updatedOrder.price            
              }
          : order
      )
    );

    setSelectedOrder(null);
  }

  // Cancel Order 
  const handleCancelOrder = () => {
    if (!selectedOrder) return;

    setOrders((prev) => 
      prev.map((order) => 
        order.id === selectedOrder.id
        ? {...order, status: "CANCELLED"}
        : order
      )
    );

    setSelectedOrder(null);
  }

  return (
    <div className="ordersPage">
      <div className="ordersHeader">
        <h3>Orders</h3>
        <p className="subtitle">Your recent buy and sell orders</p>
      </div>
      <div className="orderList">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className={`orderRow ${
              order.status === "OPEN" ? "clickable" :""
            }`}
            onClick={() => handleOrderClick(order)}
          >
            <div className="orderInfo">
              <span className="symbol">{order.symbol}</span>
              <span className={`type ${order.type.toLowerCase()}`}>
                {order.type}
              </span>
            </div>
            <div className="orderMeta">
              <span>Qty: {order.quantity}</span>
              <span>₹{order.price}</span>
            </div>
            <div className="orderActions">
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      {selectedOrder && (
        <OrderModal 
          title={`Modify ${selectedOrder.symbol}`}
          order={selectedOrder}
          submitText="Modify"
          secondaryText="Cancel Order"
          onSubmit={handleModifyOrder}
          onSecondary={handleCancelOrder}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
