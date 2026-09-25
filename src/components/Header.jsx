import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">

      {/* ================= LEFT ================= */}
      <div className="header-left">

        <Link to="/" className="header-logo-link">
          <div className="header-logo">
            <span>CG</span>
          </div>
        </Link>

        <div className="header-title-wrapper">
          <h1>Chhattisgarh Data</h1>
          <p>Explore districts, people &amp; places</p>
        </div>

      </div>


      {/* ================= NAVBAR ================= */}
      <nav className="header-center">

        <Link
          to="/"
          className={`header-nav-item ${
            isActive("/") ? "active" : ""
          }`}
        >
          <span className="nav-icon">⌂</span>
          Overview
        </Link>


        <Link
          to="/Location"
          className={`header-nav-item ${
            isActive("/Location") ? "active" : ""
          }`}
        >
          <span className="nav-icon">🗺️</span>
          Map
        </Link>


        <Link
          to="/districts"
          className={`header-nav-item ${
            isActive("/districts") ? "active" : ""
          }`}
        >
          <span className="nav-icon">▦</span>
          Districts
        </Link>


        <Link
          to="/food"
          className={`header-nav-item ${
            isActive("/food") ? "active" : ""
          }`}
        >
          <span className="nav-icon">🍚</span>
          Food
        </Link>


        <Link
          to="/tourism"
          className={`header-nav-item ${
            isActive("/tourism") ? "active" : ""
          }`}
        >
          <span className="nav-icon">🏞️</span>
          Tourism
        </Link>


        <Link
          to="/data"
          className={`header-nav-item ${
            isActive("/data") ? "active" : ""
          }`}
        >
          <span className="nav-icon">▦</span>
          Data
        </Link>

      </nav>


      {/* ================= RIGHT ================= */}
      <div className="header-right">

        <div className="header-stat">
          <strong>33</strong>
          <span>Districts</span>
        </div>

        <div className="header-state">
          <span className="state-dot"></span>
          Chhattisgarh
        </div>

      </div>

    </header>
  );
}

export default Header;