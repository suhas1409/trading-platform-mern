//component/addPositionModal/AddPositionModal.jsx
import { useEffect, useState } from "react";

export const AddPositionModal = ({onClose, onAdd}) => {
  
  //Store all form values
  const [form, setForm] = useState({
    symbol: "",
    type: "",
    quantity: "",
    avgPrice: "",
    currentPrice: "",
  });

  //Close modal when ESC key pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose]); 

  //Handle input change & Update Corresponding Field
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  //Handle form Submission and Send new position to parent page
  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      symbol: form.symbol.toUpperCase(),
      type: form.type,
      quantity: Number(form.quantity),
      avgPrice: Number(form.avgPrice),
      currentPrice: Number(form.currentPrice)
    });

    //Reset form after successful add
    setForm({
      symbol: "",
      type: "",
      quantity: "",
      avgPrice: "",
      currentPrice: ""
    })

    //Close Modal
    onClose();
  }

  return (
    //Clicking outside model closed it
    <div className="modalOverlay" onClick={onClose}>
      {/*prevent closing when clicking inside*/}
      <div 
        className="modalCard"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add Position</h3>
        <form onSubmit={handleSubmit}>

          <input
            name="symbol"
            placeholder="Stock Symbol"
            value={form.symbol}
            onChange={handleChange}
            required
          />

          <select 
            name="type" 
            value={form.type}
            onChange={handleChange}
          >
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>

          <input
            name="quantity"
            type="number"
            value={form.quantity}            
            placeholder="Quantity"
            onChange={handleChange}
            required
          />

          <input 
            name="avgPrice"
            type="number"
            placeholder="Avg Price"
            onChange={handleChange}
            required
          />

          <input 
            name="currentPrice"
            type="number"
            placeholder="Current Price"
            onChange={handleChange}
            required
          />

          <div className="modalActions">
            <button type="submit">Add Position</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}