import React, { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [isEnabled, setIsEnabled] = useLocalStorage("darkMode", false); // Custom hook

  useEffect(() => {
    updateTheme(isEnabled);
  });

  const toggleState = () => {
    setIsEnabled((prevState) => !prevState);
  };

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    toggleState();
  };
  const updateTheme = (isDarkEnabled) => {
    // Optional shorthand constant for accessing document.documentElement
    const docEl = document.documentElement;

    if (isDarkEnabled) {
      setIsEnabled(true);
      docEl.style.setProperty("--background", "#3C2619");
      docEl.style.setProperty("--foreground", "#EDE0D4");
    } else {
      setIsEnabled(false);
      docEl.style.setProperty("--background", "#EDE0D4");
      docEl.style.setProperty("--foreground", "#644029");
    }
  };
  return (
    <div className="theme-toggle">
      <input className="react-switch-checkbox" id="react-switch-new" type="checkbox" checked={isEnabled} onChange={toggleState} />
      <label className="react-switch-label" htmlFor="react-switch-new" tabIndex={0} onKeyDown={handleKeyPress}>
        <span className="react-switch-button" />
      </label>
    </div>
  );
};

export default ThemeToggle;
