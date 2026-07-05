import React from 'react';
import { useMemo, useState } from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { positionsData } from '../../data/positionsData';
import { FaArrowLeft } from 'react-icons/fa';
import "./chartPage.scss";

export const ChartPage = () => {

  const {symbol} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRange, setSelectedRange] = useState("1D");

  // Position can come from navigate state
  const passedPosition = location.state?.position;

  // Fallback if page opened directly
  const position = useMemo(() => {
    if(passedPosition) return passedPosition;

    return positionsData.find(
      (item) => item.symbol.toLowerCase() === symbol?.toLowerCase()
    );
  }, [passedPosition, symbol]);

  if(!position) {
    return(
      <div className="chartPage">
        <div className="chartPageHeader">
          <button className="backBtn" onClick={() => navigate(-1)}>
            <FaArrowLeft/>
            Back
          </button>
          <h2>Chart</h2>
        </div>

        <div className="chartNotFound">
          <h3>Stock not found</h3>
          <p>The selected stock chart cloud not be loaded.</p>
        </div>
      </div>
    );
  }

  const ranges = ["5min", "15min", "30min", "1H", "4H", "1D", "1W", "1M", "1Y"];

  return (
    <div className="chartPage">
      {/* Top Header */}
      <div className="chartPageHeader">
        <button className="backBtn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </button>
        <div className="stockTitle">
          <h2>{position.symbol}</h2>
        </div>
      </div>

      {/* Only LTP card */}
      <div className="chartSummary">
        <div className="summaryCard">
          <span>LTP</span>
          <h3>₹{position.currentPrice}</h3>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chartSection">
        <div className="chartSectionTop">
          <h3>{position.symbol} Chart</h3>

          <div className="rangeButtons">
            {ranges.map((range) => (
              <button
                key={range}
                className={selectedRange === range ? "active" : ""}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </button>
            ))
            }
          </div>
        </div>

        {/* Fake chart placeholder for now */}
        <div className="chartBox">
          <div className="chartGrid">
            <div className="gridLine"></div>
            <div className="gridLine"></div>
            <div className="gridLine"></div>
          </div>

          <svg
            className="chartSvg"
            viewBox="0 0 1000 400"
          >
            <path
              d="M0,280 C80,220 140,250 220,180 C320,90 400,230 500,160 C620,80 720,180 820,120 C900,70 960,90 1000,40"
              fill="none"
              stroke="currentColor"
              strokeWidth={5}
              strokeLinecap="round"
            />
          </svg>
          <div className="chartPlaceHolder">
            TradingView / Recharts chart will come here later
          </div>
        </div>
      </div>
    </div>
  )
}
