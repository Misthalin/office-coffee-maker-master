import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import {AuthContext} from "../../utils/AuthContext";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import "./Sidebar.css";

import { slide as Menu } from "react-burger-menu";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <Menu customCrossIcon={<CloseIcon />} right pageWrapId="page-wrap" outerContainerId="root" burgerButtonClassName="sidebar">
      <NavLink className="sidebar--link" to="/">
        Home
      </NavLink>
      {user && (
        <>
          <NavLink className="sidebar--link" to="/my-ratings">
            My Ratings
          </NavLink>

          <NavLink className="sidebar--link" to="/history">
            History
          </NavLink>

          <NavLink className="sidebar--link" to="/coffee-maker">
            Coffee Maker
          </NavLink>
          {user.role === "Admin" && (
            <NavLink className="sidebar--link" to="/manage">
              Manage
            </NavLink>
          )}
          <Link className="sidebar--link btn long inverted" to="/logout">
            Logout
          </Link>
        </>
      )}
      {!user && (
        <Link className="sidebar--link btn long inverted" to="/login">
          Login
        </Link>
      )}
    </Menu>
  );
};

export default Sidebar;
