import React, { useEffect, useRef, useState } from "react";
import { RefreshCcw, Trophy, Zap } from "lucide-react";
import { useGameStore } from "../store/useGameStore";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { startGame, currentPage, setCurrentPage, logout, user } =
    useGameStore();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="app-header">
      <div
        className="brand"
        onClick={() => setCurrentPage("game")}
        style={{ cursor: "pointer" }}
      >
        <h1>AI NEGOTIATION ARENA</h1>
      </div>

      <div className="nav-controls">
        <button
          className={`nav-link ${currentPage === "leaderboard" ? "active" : ""}`}
          onClick={() => setCurrentPage("leaderboard")}
        >
          LEADERBOARD
        </button>
        <button
          className="btn btn-cyan"
          onClick={() => startGame(user?.name || "Player")}
        >
          RESET GAME
        </button>

        <div className="user-profile" ref={dropdownRef}>
          <div className="avatar-circle" onClick={toggleDropdown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          {open && (
            <div className="profile-dropdown">
              <div className="dropdown-user">{user?.name || "Player"}</div>

              <button className="dropdown-item" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
