import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../logout/logout';
import './navbar.css';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../atoms/loggedInAtom';

const Navbar = () => {

  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/books">
            Books
          </Link>
        </li>
        {loggedIn? (
          <>
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
        </>
        ) : (
          <>
        <li>
          <Link to="/users">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/users/sign_in">
            Login
          </Link>
        </li></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
