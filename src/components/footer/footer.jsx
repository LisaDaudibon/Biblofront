import React from 'react';
import LogoFooter from './footerLogo';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
          </div>
          <div className="footer-links">
            <ul>
              <LogoFooter/>
              <li><a href="/books">Livres</a></li>
              <li><a href="/profile">Profile</a></li>
              <li>
                <a href="/about">Contact :</a>
                <a href="mailto:bibliophilea@yopmail.com">bibliophilea@yopmail.com</a>
              </li> 
              <li id="team-links"><a>Equipe:</a></li>
              <li>
                <a href="https://github.com/LisaDaudibon">LisaDaudibon</a>
                <a href="https://github.com/KarineDHoshi">KarineDHoshi</a>
              </li>
            </ul>
         
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
