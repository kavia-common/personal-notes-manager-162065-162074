import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ folders, activeFolder, onSelectFolder, onClearFolder }) {
  /** Sidebar listing folders. */
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Folders</div>
        <div
          className={`folder ${!activeFolder ? "active" : ""}`}
          onClick={onClearFolder}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onClearFolder()}
        >
          <span>📁</span>
          <span>All Notes</span>
        </div>
        {folders.map((f) => (
          <div
            key={f}
            className={`folder ${activeFolder === f ? "active" : ""}`}
            onClick={() => onSelectFolder(f)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelectFolder(f)}
          >
            <span>📂</span>
            <span>{f || "Uncategorized"}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
