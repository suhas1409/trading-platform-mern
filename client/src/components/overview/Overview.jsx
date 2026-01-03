import React from 'react'
import "./overview.scss";

export const Overview = ({user}) => {
  return (
    <div className='overview'>
      {/*Greeting and Overview header*/}
      <div className="overviewHeader">  
        <h2>Hi, {user?.username || "Trader"}</h2>
        <p className="subtitle">Here's a quick snapshot of your account</p>
      </div>
      {/*Summary Card*/}
      <div className="summaryCards">
        <div className="card">
          <p className="label">Available Balance</p>
          <h3 className="value">₹50000</h3>
        </div>

        <div className="card">
          <p className="label">Invested Amount</p>
          <h3 className="value">₹0</h3>
        </div>

        <div className="card">
          <p className="label">Total P&L</p>
          <h3 className="value">₹0</h3>
        </div>
      </div>

      {/*Empty Portfolio State */}
      <div className="emptyPortfolio">
        <h4>No investment yet</h4>
        <p>Start investment in stocks to build your portfolio and tract performance here.</p>
        <button>Start Investment</button>
      </div>
    </div>
  )
}
