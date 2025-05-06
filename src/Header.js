import React from "react";
import { useDarkMode } from "./contexts/DarkModeContext";
import { useAuth } from "./contexts/AuthContext";

export const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav>
      <a href="/">
        <div className="flex flex-row flex-row-c">
          <img src="/images/vissim_logo.png" alt="Vissim Logo" />
          <span>Projects</span>
        </div>
      </a>
      <div
        className="header-controls"
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        {isAuthenticated && (
          <div className="user-info" style={{ marginRight: "1rem", color: "#e8e8e8" }}>
            {user?.email}
          </div>
        )}
        
        <div
          className="dark-mode-toggle"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <button
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {darkMode ? (
              // Moon icon for dark mode
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e8e8e8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            ) : (
              // Sun icon for light mode
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e8e8e8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
            <span
              className="toggle-label"
              style={{
                fontFamily: "var(--ff-heading)",
                backgroundColor: "rgb(1 13 20)",
                color: "#fff",
                padding: "0.2em 0.5em 0.2em 0",
                borderRadius: "0.3em",
              }}
            >
              {darkMode ? "Dark mode" : "Light mode"}
            </span>
          </button>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={logout}
            className="logout-button"
            style={{
              background: "none",
              border: "1px solid #e8e8e8",
              color: "#e8e8e8",
              padding: "0.3em 0.8em",
              borderRadius: "0.3em",
              cursor: "pointer",
              fontFamily: "var(--ff-heading)",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
