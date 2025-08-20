import React from "react";
import { useAuth } from "../AuthContext";

// PUBLIC_INTERFACE
export default function Navbar({ search, onSearchChange }) {
  /** Top navigation bar with brand, search, and user/logout. */
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="brand">
          <div className="brand-badge">N</div>
          Notes
        </div>
      </div>
      <div className="search">
        <span role="img" aria-label="search">🔍</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notes..."
          aria-label="Search notes"
        />
      </div>
      <div className="nav-right">
        {user && <span style={{ color: "#6b7280", fontSize: 14 }}>{user.email}</span>}
        <button className="btn" onClick={logout} aria-label="Log out">Logout</button>
      </div>
    </div>
  );
}
