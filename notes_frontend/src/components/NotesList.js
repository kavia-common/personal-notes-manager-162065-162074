import React from "react";

// PUBLIC_INTERFACE
export default function NotesList({ notes, selectedId, onSelect, onCreate, onDelete }) {
  /** Displays list of notes with create and delete actions. */
  return (
    <div className="notes-list">
      <div className="list-header">
        <strong>Notes</strong>
        <button className="btn primary" onClick={onCreate}>+ New</button>
      </div>
      <div>
        {notes.length === 0 && (
          <div style={{ padding: 16, color: "#6b7280" }}>No notes found.</div>
        )}
        {notes.map((n) => (
          <div
            key={n.id}
            className="note-item"
            onClick={() => onSelect(n)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(n)}
            style={{ background: selectedId === n.id ? "rgba(25,118,210,.06)" : undefined }}
          >
            <div className="note-title">{n.title || "Untitled"}</div>
            <div className="note-meta">
              <span>{n.folder || "Uncategorized"}</span>
              <span>•</span>
              <span>{new Date(n.updated_at || n.created_at || Date.now()).toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn warn"
                onClick={(e) => { e.stopPropagation(); onDelete(n); }}
                aria-label={`Delete note ${n.title || n.id}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
