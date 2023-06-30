import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../logout/logout';
import './navbar.css';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import Logo from './logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faUser, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const loggedIn = useAtomValue(loggedInAtom);
  const isMobile = window.innerWidth <= 600;

  return (
    <nav className="navbar">
      <div className="logoContainer">
        <a href="/books" className="logoLink">
          <Logo />
        </a>
      </div>
      <ul className="navbar-list">
        <li className="menuListItem">
          <div className="iconContainer">
            {isMobile ? (
              <>
               
                <Link to="/books" className="menuLink">
                  <FontAwesomeIcon icon={faBookBookmark} className="icon" title="Books" />
                  <span>Books</span>
                </Link>
                <Link to="/profile" className="menuLink">
                  <FontAwesomeIcon icon={faUser} className="icon" title="Profile" />
                  <span>Profile</span>
                </Link>
                <Link to="/about" className="menuLink">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" title="Contact" />
                  <span>Contact</span>
                </Link>
              </>
            ) : (
              <> 
                <Link to="/books" className="menuLink" title="Contact">
                  <FontAwesomeIcon icon={faHome} className="icon" />
                  <span>Home</span>
                </Link>
                <Link to="/books" className="menuLink" title="Books">
                  <FontAwesomeIcon icon={faBookBookmark} className="icon" />
                  <span>Books</span>
                </Link>
                <Link to="/profile" className="menuLink" title="Profile">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  <span>Profile</span>
                </Link>
                <Link to="/about" className="menuLink" title="Contact">
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  <span>Contact</span>
                </Link>
               
              </>
            )}
          </div>
        </li>
        {/* ... */}
      </ul>
    </nav>
  );
};

export default Navbar;
