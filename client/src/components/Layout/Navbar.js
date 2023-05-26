import React from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import './Navbar.module.css'; // Import the CSS file for Navbar styles

function Navbar() {
  const navigation = Auth.loggedIn() ? (
    <ul className="navbar__links flex-row">
      <li className="navbar__link-item mx-1">
        <Link to="/" className="navbar__link">
          Home
        </Link>
      </li>
      <li className="navbar__link-item mx-1">
        <Link to="/tasks" className="navbar__link">
          Tasks
        </Link>
      </li>
      <li className="navbar__link-item mx-1">
        <Link to="/donation" className="navbar__link">
          Donation
        </Link>
      </li>
      <li className="navbar__link-item mx-1">
        <Link to="/account" className="navbar__link">
          Account
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
      <li className="navbar__link-item mx-1">
        <Link to="/donation" className="navbar__link">
          Donation
        </Link>
      </li>
      <li className="navbar__link-item mx-1">
        <Link to="/about" className="navbar__link">
          About Us
        </Link>
      </li>
      <li className="navbar__link-item mx-1">
        <Link to="/contact" className="navbar__link">
          Contact
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="navbar">
      <h1>
        <Link to="/" className="navbar__logo">
         Just My Tasks
        </Link>
      </h1>
      <nav>{navigation}</nav>
    </header>
  );
}

export default Navbar;
