import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import LogoFooter from './footerLogo';
import './footer.css';

const TeamPopup = ({ onClose }) => {
  return (
    <div className="team-popup">
      <a href="https://github.com/LisaDaudibon">LisaDaudibon</a>
      <a href="https://github.com/KarineDHoshi">KarineDHoshi</a>
      <button id="button-footer" onClick={onClose}>x</button>
    </div>
  );
};

const Footer = () => {
  const [showTeamPopup, setShowTeamPopup] = useState(false);

  const toggleTeamPopup = () => {
    setShowTeamPopup(prevState => !prevState);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-group">
            
            <div className="footer-links">
              <ul>
                <div className='footer-logo'>
                  <LogoFooter />
               </div>
                <li>
                  <a href="/books">
                    <FontAwesomeIcon icon={faBook} />
                    <span>Books</span>
                  </a>
                </li>
                <li>
                  <a href="/profile">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:bibliophilea@yopmail.com">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>Contact</span>
                  </a>
                </li>
                <li id="team-links">
                  <a href="#" onClick={toggleTeamPopup}>
                    <FontAwesomeIcon icon={faGithubSquare} />
                    <span>Team</span>
                  </a>
                </li>
              </ul>
            </div>
            {showTeamPopup && <TeamPopup onClose={toggleTeamPopup} />}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
