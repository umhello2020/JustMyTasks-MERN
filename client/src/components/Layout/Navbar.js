import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import './Navbar.module.css'; // Import the CSS file for Navbar styles

function Navbar() {
  const navigation = Auth.loggedIn() ? (
    <ul className="navbar__links flex-row">
      <li className="navbar__link-item mx-1">
        <Link to="/orderHistory" className="navbar__link">
          Order History
        </Link>
      </li>
      <li className="navbar__link-item mx-1">
        <a href="/" onClick={() => Auth.logout()} className="navbar__link">
          Logout
        </a>
      </li>
    </ul>
  ) : (
    <ul className="navbar__links flex-row">
      <li className="navbar__link-item mx-1">
        <Link to="/signup" className="navbar__link">
          Signup
        </Link>
      </li>
      <li className="navbar__link-item mx-1">
        <Link to="/login" className="navbar__link">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="navbar">
      <h1>
        <Link to="/" className="navbar__logo">
          <img src="shopping_bag_emoji.png" alt="Shopping bag emoji" className="navbar__logo-img" />
          Shop-Shop
        </Link>
      </h1>
      <nav>
        {navigation}
      </nav>
    </header>
  );
}

export default Navbar;

