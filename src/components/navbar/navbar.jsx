import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../logout/logout';
import './navbar.css';
import { useAtomValue } from 'jotai';
import { loggedInAtom } from '../../atoms/loggedInAtom';
import Logo from './logo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {

  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <nav className="navbar">
      <div className='logoContainer'>
        <a href="/books" className="logoLink">
          <Logo/>
        </a>
      </div>
      <ul className="navbar-list">
        <li className="menuListItem">
          <div className="iconContainer">
            {/* <FontAwesomeIcon icon={faSwatchbook} className="icon"/> */}
            <Link to="/books" className="menuLink">
            <FontAwesomeIcon icon={faSwatchbook} className="icon"/>
            </Link>
            <Link to="/about">
              Contact
            </Link>
          </div>
        </li>
        {loggedIn? (
          <>
          <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>
        <li>
          <Logout />
        </li>
        </>
        ) : (
          <>
        <li className="menuListItem">
          <div className="iconContainer">
            <FontAwesomeIcon icon={faBookBookmark} className="icon"/>
            <Link to="/users" className="menuLink">
              S'inscrire
            </Link>
          </div>
        </li>
        <li className="menuListItem">
          <div className="iconContainer">
            <FontAwesomeIcon icon={faBookOpen} className="icon"/>
            <Link to="/users/sign_in" className="menuLink loginLink">
              Se connecter
            </Link>
          </div>
        </li></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
