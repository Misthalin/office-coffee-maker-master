import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div className="footer--info">
          <h3>Coffee Maker</h3>
          <p>
            The coffee maker is a project created as a part of the IDG2100 Fullstack Exam. The coffee maker is designed to inform the employees of the
            current coffee status and give ratings to each brew.
          </p>
        </div>
        <div className="footer--nav">
          <h3>Quick Links</h3>
          <nav>
            <ul className="footer--nav__list">
              <li className="footer--nav__item">
                <Link className="footer--nav__link" to="/">
                  Home
                </Link>
              </li>
              <li className="footer--nav__item">
                <Link className="footer--nav__link" to="/my-ratings">
                  My Ratings
                </Link>
              </li>
              <li className="footer--nav__item">
                <Link className="footer--nav__link" to="/history">
                  History
                </Link>
              </li>
              <li className="footer--nav__item">
                <Link className="footer--nav__link" to="/coffee-maker">
                  Coffee Maker
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    <p className="text-center text-small">Created by Adrian and Kristian</p>
    </footer>
  );
};

export default Footer;
