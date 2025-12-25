import React from 'react'
import "./dashboard.scss"
import { Navbar } from '../../components/navbar/Navbar'
import { Watchlist } from '../../components/watchlist/watchlist'
import { Overview } from '../../components/overview/Overview'

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar/>
      <div className="dashboardContent">
        <div className="watchListSection">
          <Watchlist />
        </div>
        <div className="overviewSection">
          <Overview />
        </div>
      </div>
    </div> 
  )
}