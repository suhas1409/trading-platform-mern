import "./orders.scss";
import { orders } from "../../data/ordersData.js";
import { OrderModal } from "../../components/orderModal/OrderModal.jsx";
import { useState } from "react";

export const Orders = () => {

  const [SelectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    if(order.status !== "OPEN") return;
    setSelectedOrder(order);
  }

  const closeModal = () => {
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
            className={`orderRow ${order.status === "OPEN" ? "clickable" :""}`}
            onClick={() => handleOrderClick(order)}
          >
            <div className="orderInfo">
              <span className="symbol">{order.symbol}</span>
              <span className={`type ${order.type.toLocaleLowerCase()}`}>
                {order.type}
              </span>
            </div>
            <div className="orderMeta">
              <span>Qty: {order.qty}</span>
              <span>₹{order.price}</span>
            </div>
            <div className="orderActions">
              <span className={`status ${order.status.toLocaleLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      {SelectedOrder && (
        <OrderModal 
          order={SelectedOrder}
          onClose= {closeModal}
          onUpdate={() => console.log("Update")}
          onCancel={() => console.log("Cancel")}
        />
      )}
    </div>
  );
}
