import React from "react";
import Navigation from "../Navigation/Navigation";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Sidebar from "../Navigation/Sidebar";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <header>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Sidebar />
      <Navigation />
      <ThemeToggle />
      <LoginButton />
    </header>
  );
};

export default Header;
