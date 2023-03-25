import { useContext } from "react";
import {AuthContext} from "../../utils/AuthContext";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav className="nav-container">
        <ul className="nav--list">
          <li className="nav--item">
            <NavLink className="nav--link" to="/">
              Home
            </NavLink>
          </li>
          {user && (
            <>
              <li className="nav--item">
                <NavLink className="nav--link" to="/my-ratings">
                  My Ratings
                </NavLink>
              </li>
              <li className="nav--item">
                <NavLink className="nav--link" to="/history">
                  History
                </NavLink>
              </li>
              <li className="nav--item">
                <NavLink className="nav--link" to="/coffee-maker">
                  Coffee Maker
                </NavLink>
              </li>
              {user.role === "Admin" && (
                <li className="nav--item">
                  <NavLink className="nav--link" to="/manage">
                    Manage
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
