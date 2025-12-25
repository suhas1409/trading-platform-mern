import React from 'react'
import "./watchlist.scss"
import { FaSearch } from 'react-icons/fa'

export const Watchlist = () => {
  return (
    <div className='watchlist'>
      {/* Header */}
      <div className="watchlistHeader">
        <h3>Watchlist</h3>  
      </div>      
      {/* Search */}
      <div className="searchBox">
        <FaSearch className="searchIcon" />
        <input type="text" placeholder="Search & add stocks"/>
      </div>

      {/* Stock List */}
      <ul className="stockList">
        <li className="stockItem positive">
          <div className="stockInfo">
            <span className="symbol">RELIANCE</span>
            <span className="exchange">NSE</span>
          </div>
          <div className="stockPrice">
            <span className="price">1600</span>
            <span className="change">+12 (+0.75%)</span>
          </div>
        </li>

        <li className="stockItem negative">
          <div className="stockInfo">
            <span className="symbol">TCS</span>
            <span className="exchange">NSE</span>
          </div>
          <div className="stockPrice">
            <span className="price">3,540</span>
            <span className="change">-25.10 (-0.70%)</span>
          </div>
        </li>
        
        <li className="stockItem positive">
          <div className="stockInfo">
            <span className="symbol">INFY</span>
            <span className="exchange">NSE</span>
          </div>
          <div className="stockPrice">
            <span className="price">1,620</span>
            <span className="change">+8.40 (+0.52%)</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
