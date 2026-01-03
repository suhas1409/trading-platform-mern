import "./layout.scss";
import { Navbar } from "../../components/navbar/Navbar";
import { Watchlist } from "../../components/watchlist/Watchlist";
import { BottomNav } from "../../components/bottomNav/BottomNav";
import { MobileTopBar } from "../../components/mobileTopBar/MobileTopBar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Layout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // Dashboard route check
  const isDashboard = location.pathname === "/";

  return (
    <div className={`layout ${isDashboard ? "dashboardPage" : ""}`}>
      <Navbar user={user} />
      <MobileTopBar user={user} />

      <div className="layoutContent">
        <div className="watchListSection">
          <Watchlist />
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
