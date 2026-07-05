import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { positionsData } from "../../data/positionsData";
import { OrderModal } from "../../components/orderModal/OrderModal";

import {FaChevronDown} from "react-icons/fa";
import "./positions.scss";

export const Positions = () => {

  const navigate = useNavigate();

  //Store all positions locally. 
  //leter this data will come from backend.   
  const [positions, setPositions] = useState(positionsData)
  //Expand / Collapse row
  const [expandedId, setExpandedId] = useState(null);
  //Order modal(Add Buy / Add Sell)
  const [showOrderModal, setShowOrderModal] = useState(false);
  //Exit confirmation modal
  const [showExitModal, setShowExitModal] = useState(false);
  //Store selected position
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Expand or collapse row
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  // Open Add Buy / Add Sell modal
  const handleAddToPosition = (position) => {
    setSelectedPosition(position);
    setShowOrderModal(true);
  }

  // Handle Add Buy / Add Sell
  const handleSubmitOrder = (updateOrder) => {
    console.log("Update Order");
    console.log(updateOrder);

    //Backend API will be called here later

    setShowOrderModal(false);
    setSelectedPosition(null);
  }

  //Open Exit Position
  const handleExit = (position) => {
    setSelectedPosition(position);
    setShowExitModal(true);
  }

  // Handle Exit Submit
  const handleExitSubmit = (exitOrder) => {
    console.log("Exit Position Order");
    console.log(exitOrder);

    //Backend API call later

    setShowExitModal(false);
    setSelectedPosition(null);
  }

  //View Chart we will do it later
  const handleViewChart = (position) => {
    navigate(`/chart/${position.symbol}`,{
      state: {position}
    })
  }

  const hasPositions = positions.length > 0;

  const totalPnL = positions.reduce((total, pos) => {
    const pnl = 
      pos.type === "BUY"
        ? (pos.currentPrice - pos.avgPrice) * pos.quantity
        : (pos.avgPrice - pos.currentPrice) * pos.quantity;
    
    return total + pnl;
  }, 0)

  return (
    <div className="positionsPage">
      <div className="positionsHeader">
        <h3>Positions</h3>
        {/*Total P&L */}
        <div className="pnlCard">
          <span>Total P&L</span>
          <h2 
            className = {
            totalPnL >= 0 ? "positive" : "negative"}
          >
            {totalPnL >= 0 ? "+" : "-"}
            ₹{totalPnL.toFixed(2)}
          </h2>
        </div>
      </div>

      {!hasPositions && (             
        <div className="emptyPositions">
          <h4>No open positions</h4>
          <p>Your intraday trades will appear here.</p>
        </div>
      )}

      {hasPositions && (
        <>
          <div className="positionsTableHeader">
            <span>Stock</span>
            <span>Type</span>
            <span>Qty</span>
            <span>Avg</span>
            <span>LTP</span>
            <span>P&L</span>
          </div>

          <div className="positionsList">
            {positions.map((pos) => {

              const invested = pos.avgPrice * pos.quantity;
              const current = pos.currentPrice * pos.quantity;

              const pnl = 
                pos.type === "BUY"
                  ? (pos.currentPrice - pos.avgPrice) * pos.quantity
                  : (pos.avgPrice - pos.currentPrice) * pos.quantity;
              
              return (
                <div key={pos.id}>
                  {/* Desktop Layout */}
                  <div
                    className={`positionsRow ${
                      expandedId === pos.id ? "expanded" : ""
                    }`}
                    onClick={() => toggleExpand(pos.id)}
                  >
                    <span className="symbol">{pos.symbol}</span>

                    <span className={`type ${pos.type.toLowerCase()}`}>
                      {pos.type}
                    </span>

                    <span>{pos.quantity}</span>

                    <span>₹{pos.avgPrice}</span>

                    <span>₹{pos.currentPrice}</span>

                    <span className={pnl >= 0 ? "positive" : "negative"}>
                      ₹{pnl.toFixed(2)}
                    </span>

                    <FaChevronDown className="expandIcon" />
                  </div>

                  {/*Mobile Layout */}
                  <div 
                    className={`positionCard ${
                      expandedId === pos.id ? "expanded" : ""
                    }`}
                    onClick={() => toggleExpand(pos.id)}
                  >
                    <div className="topRow">
                      <div className="left">
                        <p className="avg">
                          Avg. ₹{pos.avgPrice}
                        </p>
                        <h3>{pos.symbol}</h3>
                        <p className="qty">
                          Qty. {pos.quantity}
                        </p>
                      </div>
                      <div className="right">
                        <span
                          className={`tag ${
                            pos.type === "BUY" ? "buy" : "sell"
                          }`}
                        >
                          {pos.type}
                        </span>

                        <h3 className={pnl >= 0 ? "positive" : "negative"}>
                          ₹{pnl.toFixed(2)}
                        </h3>

                        <p>LTP ₹{pos.currentPrice}</p>
                      </div>
                    </div>
                  </div>
                  
                  {expandedId === pos.id && (
                    <div className="positionExpand">
                      <div>
                        <span>Invested Amount</span>
                        <strong>
                          ₹{invested.toFixed(2)}
                        </strong>
                      </div>

                      <div>
                        <span>Current Amount</span>
                        <strong
                          className={
                            current >= invested
                              ? "positive"
                              : "negative"
                          }
                        >
                          ₹{current.toFixed(2)}
                        </strong>
                      </div>

                      <div className="actions">
                        <button 
                          className={pos.type === "BUY" ? "buyBtn" : "sellBtn"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToPosition(pos);
                          }}
                        >
                          {pos.type === "BUY" ? "Add Buy" : "Add Sell"}
                        </button>
                        <button 
                          className="exitBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExit(pos);
                          }}
                        >
                          Exit
                        </button>
                        <button 
                          className="chartBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewChart(pos);
                          }}
                        >
                          View Chart
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Buy / Add Sell Modal */}
          {showOrderModal && selectedPosition && (
            <OrderModal 
              title={`Add ${selectedPosition.type} Position`}

              order={{
                ...selectedPosition,
                quantity: 1,
                price: selectedPosition.currentPrice,
              }}

              submitText={selectedPosition.type}
              secondaryText="Cancel"
              onSubmit={handleSubmitOrder}
              onSecondary={() => {
                setShowOrderModal(false);
                setSelectedPosition(null);
              }}
              onClose={() => {
                setShowOrderModal(false);
                setSelectedPosition(null);
              }}
            />
          )}

          {/* Exit Modal */}
          {showExitModal && selectedPosition && (
            <OrderModal
              title={`Exit ${selectedPosition.symbol}`}
              order={{
                ...selectedPosition,
                quantity: selectedPosition.quantity,
                price: selectedPosition.currentPrice,
                type: selectedPosition.type === "BUY" ? "SELL" : "BUY",
              }}
              submitText="Exit"
              secondaryText="Cancel"
              onSubmit={handleExitSubmit}
              onSecondary={() => {
                setShowExitModal(false);
                setSelectedPosition(null);
              }}
              onClose={() => {
                setShowExitModal(false);
                setSelectedPosition(null);
              }}
            />
          )}
        </>
      )}
    </div>
  )
}