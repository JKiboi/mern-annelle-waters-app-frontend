
import React from 'react';
import "../styles/NavBar.css"
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar__brand">Annelle Waters</h1>
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link to="/" className="navbar__link">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/delivery-schedule" className="navbar__link">Delivery Schedule</Link>
        </li>
        <li className="navbar__item">
          <Link to="/client-management" className="navbar__link">Client Management</Link>
        </li>
        <li className="navbar__item">
          <Link to="/inventory-management" className="navbar__link">Inventory Management</Link>
        </li>
        <li className="navbar__item">
          <Link to="/sales-tracking" className="navbar__link">Sales Tracking</Link>
        </li>
        <li className="navbar__item">
          <Link to="/expenses-tracking" className="navbar__link">Expenses Tracking</Link>
        </li>
        <li className="navbar__item">
          <Link to="/analytics" className="navbar__link">Analytics</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
