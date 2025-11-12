"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  fetchLoreEntries,
  updateLoreEntry,
  deleteLoreEntry,
} from "../../../../lib/api";

export default function LoreEntriesPage() {
  const { id } = useParams();
  const [loreentries, setLoreEntries] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchLoreEntries(id).then(setLoreEntries).catch(console.error);
  }, [id]);

  if (!loreentries) return <p>Loading world...</p>;

  const handleEditClick = (loreEntry) => {
    setEditing(loreEntry.id);
    setForm({
      name: loreEntry.name,
      category: loreEntry.category,
      description: loreEntry.description,
    });
  };

  const handleDeleteClick = async (loreEntryId) => {
    try {
      await deleteLoreEntry(loreEntryId);
      setLoreEntries(loreentries.filter((l) => l.id !== loreEntryId));
    } catch (error) {
      console.error("Failed to delete loreEntry:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateLoreEntry(editing, form);
      setLoreEntries(loreentries.map((l) => (l.id === editing ? updated : l)));
      setEditing(null);
      setForm({
        name: "",
        race: "",
        class: "",
        alignment: "",
        background: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to update loreEntry:", error);
    }
  };

  return (
    <div>
      <h1>LoreEntries</h1>
      <Link href={`/worlds/${id}/loreEntry/create`}>
        <button>Create New LoreEntry</button>
      </Link>
      <ul>
        {loreentries.map((l) => (
          <li key={l.id}>
            {editing === l.id ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Name"
                />
                <input
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  placeholder="Category"
                />
                <input
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Description"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditing(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                {l.name}, {l.category}, {l.description}
                <button onClick={() => handleEditClick(l)}>Edit</button>
                <button onClick={() => handleDeleteClick(l.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
