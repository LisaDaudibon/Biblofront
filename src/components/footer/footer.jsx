import React from 'react';
import Logo from './footerLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import './footer.css';

const Footer = () => {

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
          <Logo/>

          {/* <FontAwesomeIcon icon={faBookOpen} className="icon"/> */}
            </div>
          <div className="footer-links">
            <ul>
              <li><a href="/books">Livres</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/about">Contact :</a> <a href="mailto:bibliophilea@yopmail.com">bibliophilea@yopmail.com</a> </li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
