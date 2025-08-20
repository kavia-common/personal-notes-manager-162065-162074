import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NotesList from "../components/NotesList";
import Editor from "../components/Editor";
import { api } from "../api";

// PUBLIC_INTERFACE
export default function Notes() {
  /** Main notes page with top navbar, sidebar, list and editor. */
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState("");

  const loadNotes = async (q) => {
    const data = await api.listNotes({ q });
    setNotes(Array.isArray(data) ? data : data?.items || []);
  };

  const loadFolders = async () => {
    try {
      const data = await api.listFolders();
      setFolders(Array.isArray(data) ? data : data?.items || []);
    } catch {
      // if backend doesn't support folders endpoint, derive from notes
      const unique = Array.from(new Set((notes || []).map((n) => n.folder).filter(Boolean)));
      setFolders(unique);
    }
  };

  useEffect(() => {
    loadNotes("");
  }, []);

  useEffect(() => {
    loadFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const filteredNotes = useMemo(() => {
    let list = notes;
    if (activeFolder) list = list.filter((n) => (n.folder || "") === activeFolder);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (n) =>
          (n.title || "").toLowerCase().includes(s) ||
          (n.content || "").toLowerCase().includes(s) ||
          (n.folder || "").toLowerCase().includes(s)
      );
    }
    return list.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
  }, [notes, search, activeFolder]);

  const handleCreate = async () => {
    const newNote = await api.createNote({ title: "Untitled", content: "", folder: activeFolder || "" });
    await loadNotes(search);
    setSelected(newNote);
  };

  const handleDelete = async (note) => {
    if (!note?.id) return;
    await api.deleteNote(note.id);
    await loadNotes(search);
    if (selected?.id === note.id) setSelected(null);
  };

  const handleSave = async (payload) => {
    if (payload.id) {
      const updated = await api.updateNote(payload.id, payload);
      setSelected(updated);
    } else {
      const created = await api.createNote(payload);
      setSelected(created);
    }
    await loadNotes(search);
  };

  return (
    <div className="container">
      <Navbar search={search} onSearchChange={setSearch} />
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        onSelectFolder={setActiveFolder}
        onClearFolder={() => setActiveFolder("")}
      />
      <main className="main">
        <NotesList
          notes={filteredNotes}
          selectedId={selected?.id}
          onSelect={setSelected}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
        <Editor selected={selected} onSave={handleSave} />
      </main>
    </div>
  );
}
