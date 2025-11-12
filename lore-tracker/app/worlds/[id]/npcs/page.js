"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchNpcs, updateNpc, deleteNpc } from "../../../../lib/api";

export default function NpcsPage() {
  const { id } = useParams();
  const [npcs, setNpcs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchNpcs(id).then(setNpcs).catch(console.error);
  }, [id]);

  if (!npcs) return <p>Loading world...</p>;

  const handleEditClick = (npc) => {
    setEditing(npc.id);
    setForm({
      name: npc.name,
      role: npc.role,
      location: npc.location,
      description: npc.description,
    });
  };

  const handleDeleteClick = async (npcId) => {
    try {
      await deleteNpc(npcId);
      setNpcs(npcs.filter((n) => n.id !== npcId));
    } catch (error) {
      console.error("Failed to delete npc:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateNpc(editing, form);
      setNpcs(npcs.map((n) => (n.id === editing ? updated : n)));
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
      console.error("Failed to update npc:", error);
    }
  };

  return (
    <div>
      <h1>Npcs</h1>
      <Link href={`/worlds/${id}/npcs/create`}>
        <button>Create New Npc</button>
      </Link>
      <ul>
        {npcs.map((n) => (
          <li key={n.id}>
            {editing === n.id ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Name"
                />
                <input
                  name="role"
                  value={form.role}
                  onChange={handleFormChange}
                  placeholder="Role"
                />
                <input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  placeholder="Location"
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
                {n.name}, {n.role}, {n.location}, {n.description}
                <button onClick={() => handleEditClick(n)}>Edit</button>
                <button onClick={() => handleDeleteClick(n.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
