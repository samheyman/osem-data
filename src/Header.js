import React from 'react';
import { useDarkMode } from './contexts/DarkModeContext';

export const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <nav>
      <a href="/">
        <div className="flex flex-row flex-row-c">
          <img src="/images/vissim_logo.png" alt="Vissim Logo" /> 
          <span>Windfarms and Rigs</span>
        </div>
      </a>
      <div className="dark-mode-toggle">
        <label className="switch">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={toggleDarkMode} 
          />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label" style={{ fontFamily: "var(--ff-heading)" }}>{darkMode ? 'Dark' : 'Light'}</span>
      </div>
    </nav>
  );
};
