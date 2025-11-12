"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchBbegs, updateBbeg, deleteBbeg } from "../../../../lib/api";

export default function BbegsPage() {
  const { id } = useParams();
  const [bbegs, setBbegs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    title: "",
    species: "",
    goal: "",
    description: "",
  });

  useEffect(() => {
    fetchBbegs(id).then(setBbegs).catch(console.error);
  }, [id]);

  if (!bbegs) return <p>Loading world...</p>;

  const handleEditClick = (bbeg) => {
    setEditing(bbeg.id);
    setForm({
      name: bbeg.name,
      title: bbeg.title,
      species: bbeg.species,
      goal: bbeg.goal,
      description: bbeg.description,
    });
  };

  const handleDeleteClick = async (bbegId) => {
    try {
      await deleteBbeg(bbegId);
      setBbegs(bbegs.filter((b) => b.id !== bbegId));
    } catch (error) {
      console.error("Failed to delete bbeg:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateBbeg(editing, form);
      setBbegs(bbegs.map((b) => (b.id === editing ? updated : b)));
      setEditing(null);
      setForm({
        name: "",
        title: "",
        species: "",
        goal: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to update bbeg:", error);
    }
  };

  return (
    <div>
      <h1>Bbegs</h1>bbeg
      <Link href={`/worlds/${id}/bbegs/create`}>
        <button>Create New Bbeg</button>
      </Link>
      <ul>
        {bbegs.map((b) => (
          <li key={b.id}>
            {editing === b.id ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Name"
                />
                <input
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Title"
                />
                <input
                  name="species"
                  value={form.species}
                  onChange={handleFormChange}
                  placeholder="Species"
                />
                <input
                  name="goal"
                  value={form.goal}
                  onChange={handleFormChange}
                  placeholder="Goal"
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
                {b.name}, {b.title}, {b.species}, {b.goal}, {b.description}
                <button onClick={() => handleEditClick(b)}>Edit</button>
                <button onClick={() => handleDeleteClick(b.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
