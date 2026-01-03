import React from 'react'
import "./watchlist.scss"
import { FaSearch } from 'react-icons/fa'
import { BottomNav } from '../bottomNav/BottomNav'
import { watchlistData } from '../../data/watchlistData.js'

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
        {watchlistData.map((stock, index) => (
          <li 
            key={index}
            className={`stockItem ${stock.change >= 0 ? "positive" : "negative"}`}
          >
            <div className="stockInfo">
              <span className="symbol">{stock.symbol}</span>
              <span className="exchange">{stock.exchange}</span>
            </div>
            <div className="stockPrice">
              <span className="price">{stock.price}</span>
              <span className="change">
                {stock.change > 0 ? "+" : "-"}
                {stock.change} ({stock.percent}%)
              </span>
            </div>
          </li>
        ))}
      </ul>
      <BottomNav />
    </div>
  )
}
