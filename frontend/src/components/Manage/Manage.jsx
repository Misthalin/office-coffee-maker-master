import React from 'react'
import { NavLink, Route, Routes, Navigate, useLocation } from "react-router-dom";
import ManageBeans from './ManageBeans';
import ManageUsers from './ManageUsers';
import './Modal.css';

const Manage = (props) => {
  let location = useLocation();
  
return (
    <>
      <nav className="internal--nav__container">
        <ul className="internal--nav__list">
          <li className="internal--nav__item">
            <NavLink className="internal--nav__link" to="users">
              Manage users
            </NavLink>
          </li>
          <li className="internal--nav__item">
            <NavLink className="internal--nav__link" to="beans">
              Manage beans
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" index element={<Navigate to="users" state={{ from: location }} replace /> } />
        <Route path="users" index element={<ManageUsers {...props} />} />
        <Route path="beans" element={<ManageBeans {...props} />} />
      </Routes>
    </>
  );
}

export default Manage;