"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  fetchFactions,
  updateFaction,
  deleteFaction,
} from "../../../../lib/api";

export default function FactionsPage() {
  const { id } = useParams();
  const [factions, setFactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    type: "",
    headquarters: "",
    goals: "",
    description: "",
  });

  useEffect(() => {
    fetchFactions(id).then(setFactions).catch(console.error);
  }, [id]);

  if (!factions) return <p>Loading world...</p>;

  const handleEditClick = (faction) => {
    setEditing(faction.id);
    setForm({
      name: faction.name,
      type: faction.type,
      headquarters: faction.headquarters,
      goals: faction.goals,
      description: faction.description,
    });
  };

  const handleDeleteClick = async (factionId) => {
    try {
      await deleteFaction(factionId);
      setFactions(factions.filter((f) => f.id !== factionId));
    } catch (error) {
      console.error("Failed to delete faction:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateFaction(editing, form);
      setFactions(factions.map((f) => (f.id === editing ? updated : f)));
      setEditing(null);
      setForm({
        name: "",
        type: "",
        headquarters: "",
        goals: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to update faction:", error);
    }
  };

  return (
    <div>
      <h1>Factions</h1>
      <Link href={`/worlds/${id}/factions/create`}>
        <button>Create New Faction</button>
      </Link>
      <ul>
        {factions.map((f) => (
          <li key={f.id}>
            {editing === f.id ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Name"
                />
                <input
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  placeholder="Type"
                />
                <input
                  name="headquarters"
                  value={form.headquarters}
                  onChange={handleFormChange}
                  placeholder="Headquarters"
                />
                <input
                  name="goals"
                  value={form.goals}
                  onChange={handleFormChange}
                  placeholder="Goals"
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
                {f.name}, {f.type}, {f.headquarters}, {f.goals}, {f.description}
                <button onClick={() => handleEditClick(c)}>Edit</button>
                <button onClick={() => handleDeleteClick(c.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
