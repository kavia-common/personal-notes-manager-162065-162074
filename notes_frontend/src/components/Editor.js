import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function Editor({ selected, onSave }) {
  /** Editor for the selected note; handles create/update via onSave. */
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(selected?.title || "");
    setFolder(selected?.folder || "");
    setContent(selected?.content || "");
  }, [selected]);

  const handleSave = () => {
    onSave({
      id: selected?.id,
      title: title.trim(),
      folder: folder.trim(),
      content,
    });
  };

  return (
    <div className="editor">
      <div className="editor-toolbar">
        <button className="btn primary" onClick={handleSave}>Save</button>
      </div>
      <div className="editor-body">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
        <input
          className="input"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          placeholder="Folder (optional)"
          aria-label="Folder"
        />
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          aria-label="Note content"
        />
      </div>
    </div>
  );
}
