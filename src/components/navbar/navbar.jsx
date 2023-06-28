import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../logout/logout';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/books">
            Books
          </Link>
        </li>
        <li>
          <Link to="/users">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/users/sign_in">
            Login
          </Link>
        </li>
        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <button onClick={Logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
