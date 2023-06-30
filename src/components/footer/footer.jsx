import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import LogoFooter from './footerLogo';
import './footer.css';

const Footer = () => {
  const isSmallDevice = window.innerWidth <= 600;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          
          <div className="footer-links">
            <ul><div className="footer-logo">
            <LogoFooter />
          </div>
              <li>
                <a href="/books">
                  {isSmallDevice ? (
                    <FontAwesomeIcon icon={faBook} />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faBook} />
                      <span>Books</span>
                    </>
                  )}
                </a>
              </li>
              <li>
                <a href="/profile">
                  {isSmallDevice ? (
                    <FontAwesomeIcon icon={faUser} />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUser} />
                      <span>Profile</span>
                    </>
                  )}
                </a>
              </li>
              <li>
                <a href="mailto:bibliophilea@yopmail.com">
                  {isSmallDevice ? (
                    <FontAwesomeIcon icon={faEnvelope} />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span>Contact</span>
                    </>
                  )}
                </a>
              </li>
              <li id="team-links">
                <a href="#">
                  {isSmallDevice ? (
                    <FontAwesomeIcon icon={faGithubSquare} />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faGithubSquare} />
                      <span>Team</span>
                    </>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
