import "./bottomNav.scss";
import {
  FaBriefcase,
  FaChartLine,
  FaEye,
  FaLayerGroup,
  FaShoppingCart,
  FaUser
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  
  const location = useLocation();

  return (
    <div className="bottomNav">
      {/* Watchlist */}
      <Link
        to="/"
        className={location.pathname === "/" ? "active" : ""}
      >
        <FaEye />
        <span>Watchlist</span>
      </Link>

      {/* Orders */}
      <Link
        to="/orders"
        className={location.pathname === "/orders" ? "active" : ""}
      >
        <FaShoppingCart />
        <span>Orders</span>
      </Link>

      {/* Portfolio */}
      <Link
        to="/portfolio"
        className={location.pathname === "/portfolio" ? "active" : ""}
      >
        <FaBriefcase />
        <span>Portfolio</span>
      </Link>

      {/* Positions */}
      <Link
        to="/positions"
        className={location.pathname === "/positions" ? "active" : ""}
      >
        <FaLayerGroup />
        <span>Positions</span>
      </Link>

      {/* Profile */}
      <Link
        to="/profile"
        className={location.pathname === "/profile" ? "active" : ""}
      >
        <FaUser />
        <span>Profile</span>
      </Link>
    </div>
  );
};
