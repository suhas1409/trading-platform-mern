import "./navbar.scss";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png"

export const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Market Index Bar */}
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

      {/* Main Navigation */}
      <div className="navContent">
        <Link to="/" className="logo">
          <img src={logo} alt="Learn2Trade Logo" />
        </Link>
        
        <ul className="menu">
          <li className="navLink"><Link to="/">Dashboard</Link></li>
          <li className="navLink"><Link to="/orders">Orders</Link></li>
          <li className="navLink"><Link to="/holdings">Holdings</Link></li>
          <li className="navLink"><Link to="/positions">Positions</Link></li>
        </ul>

        {/* Profile */}
        <div className="profile">
          <Link to="/profile" className="profileLink">
            <FaUserCircle className="profileIcon"/>
            <span className="username">Suhas</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
