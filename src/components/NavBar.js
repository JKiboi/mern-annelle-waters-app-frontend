import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/NavBar.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar__container">
        <h1 className="navbar__brand">Annelle Waters</h1>
        <div className={`navbar__menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <ul className={`navbar__menu ${menuOpen ? 'active' : ''}`}>
        <li className="navbar__item">
          <Link to="/" className="navbar__link" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/delivery-schedule" className="navbar__link" onClick={closeMenu}>
            Delivery Schedule
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/client-management" className="navbar__link" onClick={closeMenu}>
            Client Management
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/inventory-management" className="navbar__link" onClick={closeMenu}>
            Inventory Management
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/sales-tracking" className="navbar__link" onClick={closeMenu}>
            Sales Tracking
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/expenses-tracking" className="navbar__link" onClick={closeMenu}>
            Expenses Tracking
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/analytics" className="navbar__link" onClick={closeMenu}>
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
