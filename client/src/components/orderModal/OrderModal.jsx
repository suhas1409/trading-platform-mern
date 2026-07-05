//component/orderModal/OrderModal.jsx
import { useEffect, useState } from "react";
import "./OrderModal.scss";
import {FaTimes} from "react-icons/fa"

export const OrderModal = ({
  title = "Order", 
  order, 
  submitText="Submit", 
  secondaryText="Cancel", 
  onSubmit, 
  onSecondary, 
  onClose
}) => {

  //Don't render if no order is selected
  if(!order) return null;

  //Store editable values
  const [quantity, setQuantity] = useState(order.quantity);
  const [price, setPrice] = useState(order.price ?? order.currentPrice);

  //Update values whenever another stock is selected
  useEffect(() => {
    setQuantity(order.quantity);
    setPrice(order.price ?? order.currentPrice);
  },[order]);
  
  //Close modal using Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  //Submit updated order
  const handleSubmit = () => {

    if(Number(quantity) <= 0) {
      alert("Quantity should be greater than zero.");
      return;
    }

    if(Number(price) <=0) { 
      alert("Price should be greater than zero.");
      return;
    }

    onSubmit?.({
      ...order,
      quantity: Number(quantity),
      price: Number(price),
    });

    //Close modal after successfull submit
    onClose?.();
  }
  
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div 
        className="modalCard" 
        onClick={(e) => e.stopPropagation()}
      >
        {/*Header*/}
        <div className="modalHeader">
          <h3>{title}</h3>
          <FaTimes 
            className="closeIcon" 
            onClick={onClose}
          />
        </div>
        {/*Stock*/}
        <div className="field">
          <label>Stock</label>
          <input 
            value={order.symbol} 
            disabled
          />
        </div>
        {/* Buy / Sell */}
        <div className="field">
          <label>Type</label>
          <input 
            value={order.type} 
            disabled
          />
        </div>
        {/* Quantity */}
        <div className="field">
          <label>Quantity</label>
          <input 
            type="number" 
            min="1"
            step="1"
            value={quantity}
            onWheel={(e) => e.target.blur()}
            onChange={(e) => setQuantity(e.target.value)} 
          />
        </div>
        {/* Price */}
        <div className="field">
          <label>Price</label>
          <input 
            type="number" 
            min="1"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        {/* Footer Buttons */}
        <div className="action">
          <button 
            className={`primaryBtn ${order.type.toLowerCase()}`}
            onClick={handleSubmit}
          >
            {submitText}
          </button>
          <button 
            className="secondaryBtn" 
            onClick={() => {
              if(onSecondary) onSecondary();
              onClose?.();
            }}
          >
            {secondaryText}
          </button>
        </div>
      </div>
    </div>
  );
}
