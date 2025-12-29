import React from 'react'
import "./mobileTopBar.scss";
import logo from "../../assets/logo.png";

export const MobileTopBar = () => {
  return (
    <div className="mobileTopBar">
      <div className="logo">
        <img src={logo} alt="Learn2Trade logo" className="logoImage" />
      </div>

      <div className="marketIndex">
        <div className="indexItem">
          <h4 className="indexName">NIFTY 50</h4>
          <p className="indexValue">
            <span className="price positive">26200</span>
            <span className="change">+105.75 (0.38%)</span>
          </p>
        </div>
        <div className="indexItem">
          <h4 className="indexName">SENSEX</h4>
          <p className="indexValue">
            <span className="price positive">82000</span>
            <span className="change">+300.75 (0.38%)</span>
          </p>
        </div>
      </div>
      
    </div>
  )
}
