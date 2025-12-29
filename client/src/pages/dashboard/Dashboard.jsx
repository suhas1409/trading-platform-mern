import React from 'react'
import "./dashboard.scss"
import { Navbar } from '../../components/navbar/Navbar'
import { Watchlist } from '../../components/watchlist/Watchlist'
import { Overview } from '../../components/overview/Overview'
import { BottomNav } from '../../components/bottomNav/BottomNav'
import { MobileTopBar } from '../../components/mobileTopBar/MobileTopBar'

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar/>
      <MobileTopBar />

      <div className="dashboardContent">
        <div className="watchListSection">
          <Watchlist />
        </div>

        <div className="overviewSection">
          <Overview />
        </div>
        
        <BottomNav />
      </div>
    </div> 
  )
}