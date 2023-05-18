import React from 'react';
import Auth from '../utils/Auth';
import { Link } from 'react-router-dom';

function Navbar() {
    const navigation = Auth.loggedIn() ? (
        <ul className="flex-row">
            <li className="mx-1">
                <Link to="/orderHistory">
                    Order History
                </Link>
            </li>
            <li className="mx-1">
                <a href="/" onClick={() => Auth.logout()}>
                    Logout
                </a>
            </li>
        </ul>
    ) : (
        <ul className="flex-row">
            <li className="mx-1">
                <Link to="/signup">
                    Signup
                </Link>
            </li>
            <li className="mx-1">
                <Link to="/login">
                    Login
                </Link>
            </li>
        </ul>
    );
 
    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/">
                    <img src="shopping_bag_emoji.png" alt="Shopping bag emoji" />
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
