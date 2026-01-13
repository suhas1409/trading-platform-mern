import { useEffect } from "react";
import "./OrderModal.scss";
import {FaTimes} from "react-icons/fa"

export const OrderModal = ({order, onClose, onUpdate, onCancel}) => {
  
  if(!onClose) return null;
  //Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>Modify Order</h3>
          <FaTimes className="closeIcon" onClick={onClose}/>
        </div>
        <div className="field">
          <label>Stock</label>
          <input value={order.symbol} disabled/>
        </div>
        <div className="field">
          <label>Type</label>
          <input value={order.type} disabled/>
        </div>
        <div className="field">
          <label>Quantity</label>
          <input type="number" defaultValue={order.qty} />
        </div>
        <div className="field">
          <label>Price</label>
          <input type="number" defaultValue={order.price} />
        </div>
        <div className="action">
          <button className="updateBtn" onClick={onUpdate}>
            Modify Order
          </button>
          <button className="cancelBtn" onClick={onCancel}>
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}
