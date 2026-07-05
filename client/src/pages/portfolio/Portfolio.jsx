import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { portfolioData } from "../../data/portfolioData.js";
import { OrderModal } from "../../components/orderModal/OrderModal.jsx";
import { FaChevronDown } from "react-icons/fa";
import "./portfolio.scss";

export const Portfolio = () => {

  const navigate = useNavigate();

  // Portfolio data state
  const [portfolio, setPortfolio] = useState(portfolioData);
  // Expand / Collapse
  const [expandedId , setExpandedId] = useState(null);

  // Modals
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  //Selected stock
  const [selectedStock, setSelectedStock] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId (expandedId === id ? null : id);
  };

  // Buy More of Holding
  const handleBuy = (stock) => {
    setSelectedStock(stock);
    setShowBuyModal(true);
  }

  // Submit buy
  const handleSubmitBuy = (updatedOrder) => {
    console.log("Buy Order:", updatedOrder);

    //Later backend API call here 
    setShowBuyModal(false);
    setSelectedStock(null);
  }

  // Exit Holding
  const handleExit = (stock) => {
    setSelectedStock(stock);
    setShowExitModal(true);
  }

  // Submit Exit 
  const handleExitSubmit = (exitOrder) => {
    console.log("Exit Order", exitOrder);

    // Later Backend API call here
    setShowExitModal(false);
    setSelectedStock(null);
  }

  // View Chart
  const handleViewChart = (stock) => {
    navigate(`/chart/${stock.symbol}`, {
      state: {position: stock},
    });
  }

  const hasPortfolio = portfolio.length > 0;

  //Total Invested Amount
  const totalInvested = portfolio.reduce((total, stock) => {
    return total + stock.avgPrice * stock.quantity;
  }, 0);

  //Total Current Amount
  const totalCurrent = portfolio.reduce((total, stock) => {
    return total + stock.currentPrice * stock.quantity;
  }, 0);
  
  //Total P&L
  const totalPnL = totalCurrent - totalInvested;

  //Percentage P&L
  const pnlPercent = 
    totalInvested === 0 ? 0 : ((totalPnL / totalInvested) * 100).toFixed(2);

  return (
    <div className="portfolioPage">
      {/*Header*/}
      <div className="portfolioHeader">
        <h3>Portfolio</h3>

        <div className="pnlCard">
          <span>Total P&L</span>

          <div className="pnlValues">
            <h2 className={totalPnL >= 0 ? "positive" : "negative"}>
              {totalPnL >= 0 ? "+" : "-"}₹{Math.abs(totalPnL).toFixed(2)}
            </h2>

            <p className={totalPnL >= 0 ? "positive" : "negative"}>
              ({totalPnL >= 0 ? "+" : "-"}
              {Math.abs(Number(pnlPercent)).toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>

      {/*Empty Portfolio State */}
      {!hasPortfolio &&
      <div className="emptyPortfolio">
        <h4>No investment yet</h4>
        <p>Start investment in stocks to build your portfolio.</p>
      </div>}

      {hasPortfolio && (
        <>
          {/* Desktop Portfolio header*/}
          <div className="portfolioTableHeader">
            <span>Stock</span>
            <span>Qty</span>
            <span>Avg Price</span>
            <span>LTP</span>
            <span>P&L</span>
            <span></span>
          </div>
          {/*Holding*/}
          <div className="portfolioList">
            {portfolio.map((stock) => {
              const pnl = (stock.currentPrice - stock.avgPrice) * stock.quantity;

              const invested = stock.avgPrice * stock.quantity;
              const current = stock.currentPrice * stock.quantity;

              const percent = 
                invested === 0 
                  ? 0 
                  : ((current -invested)/invested) * 100;

              return (
                <div key={stock.id}>
                  {/*Desktop Row*/}
                  <div 
                    className={`portfolioRow ${
                      expandedId === stock.id ? "expanded" : ""
                    }`}
                    onClick = {() => toggleExpand(stock.id)}
                  >    
                    <span className="symbol">{stock.symbol}</span>
                    <span>{stock.quantity}</span>
                    <span>₹{stock.avgPrice}</span>
                    <span>
                      ₹{stock.currentPrice}
                    </span>
                    <span className={ pnl >= 0 ? "positive" : "negative" }>
                      ₹{pnl.toFixed(2)}
                    </span>
                    {/*Expand Icon*/}
                    <FaChevronDown className="expandIcon"/>
                  </div>

                  {/* Mobile card */}
                  <div 
                    className={`portfolioCard ${
                      expandedId === stock.id ? "expanded" : ""
                    }`}
                    onClick={() => toggleExpand(stock.id)}
                  >
                    <div className="topRow">
                      <div className="left">
                        <p className="avg">Avg. ₹{stock.avgPrice}</p>
                        <h3>{stock.symbol}</h3>
                        <p className="qty">Qty. {stock.quantity}</p>
                      </div>
                      <div className="right">
                        <h3 className={pnl >= 0 ? "positive" : "negative"}>
                          ₹{pnl.toFixed(2)}
                        </h3>
                        <p>LTP ₹{stock.currentPrice}</p>
                        <span className={percent >= 0 ? "positive" : "negative"}>
                          {percent >= 0 ? "+" : "-"}
                          {percent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/*Expand Section */}
                  {expandedId === stock.id && (
                    <div className="portfolioExpand">
                      <div className="expandStats">
                        <div className="statItem">
                          <span>Invested Amount </span>
                          <strong>₹{invested.toFixed(2)}</strong>
                        </div>

                        <div className="statItem">
                          <span>Current Amount </span>
                          <strong className={current >= invested ? "positive" : "negative"}>
                            ₹{current.toFixed(2)}
                          </strong>
                        </div>

                        <div className="statItem">
                          <span>Return</span>
                          <strong className={percent >= 0 ? "positive" : "negative"}>
                            {percent >= 0 ? "+" : "-"}
                            {percent.toFixed(2)}%
                          </strong>
                        </div>
                      </div>

                      <div className="actions">
                        <button 
                          className="buyBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuy(stock);
                          }}
                        >
                          Buy
                        </button>
                        <button 
                          className="exitBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExit(stock);
                          }}
                        >
                          Exit
                        </button>
                        <button 
                          className="chartBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewChart(stock);
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
        </>
      )}
      {/* Bottom portfolio summary*/}
      <div className="portfolioSummary">
        <div className="summary">
          <span>Invested amount</span>
          <strong>₹{totalInvested.toFixed(2)}</strong>
        </div>

        <div className="summary">
          <span>Current amount</span>
          <strong className={totalPnL >= 0 ? "positive" : "negative"}>
            ₹{totalCurrent.toFixed(2)}
          </strong>
        </div>

        <div className="summary">
          <span>Total Change</span>
          <strong className={totalPnL >= 0 ? "positive" : "negative"}>
            {totalPnL >= 0 ? "+" : "-"}
            {Math.abs(Number(pnlPercent)).toFixed(2)}%
          </strong>
        </div>
      </div>

      {/* Buy Modal */}
      {showBuyModal && selectedStock && (
        <OrderModal
          title={`Buy ${selectedStock.symbol}`}
          order={{
            ...selectedStock,
            quantity: 1,
            price: selectedStock.currentPrice,
            type: "BUY",
          }}
          submitText="Buy"
          secondaryText="Cancel"
          onSubmit={handleSubmitBuy}
          onSecondary={() => {
            setShowBuyModal(false);
            setSelectedStock(null);
          }}
          onClose={() => {
            setShowBuyModal(false);
            setSelectedStock(null);
          }}
        />
      )}

      {/* Exit Modal */}
      {showExitModal && selectedStock && (
        <OrderModal 
          title={`Exit ${selectedStock.symbol}`}
          order={{
            ...selectedStock,
            quantity: selectedStock.quantity,
            price: selectedStock.currentPrice,
            type: "SELL"
          }}
          submitText="Exit"
          secondaryText="Cancel"
          onSubmit={handleExitSubmit}
          onSecondary={() => {
            setShowExitModal(false);
            setSelectedStock(null);
          }}
          onClose={() => {
            setShowExitModal(false);
            setSelectedStock(null);
          }}
        />
      )}
    </div>
  );
}
