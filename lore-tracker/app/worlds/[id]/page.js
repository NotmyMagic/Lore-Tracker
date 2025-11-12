"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchWorld, updateWorld, deleteWorld } from "../../../lib/api";
import Link from "next/link";

export default function WorldPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [world, setWorld] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchWorld(id).then(setWorld).catch(console.error);
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updated = await updateWorld(id, form);
      setWorld(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this world?")) return;
    try {
      await deleteWorld(id);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!world) return <p>Loading world...</p>;

  const handleEditClick = (world) => {
    setForm({
      name: world.name,
      description: world.description,
    });
    setEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleFormChange}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h1>{world.name}</h1>
          <p>{world.description}</p>
          <button onClick={() => handleEditClick(world)}>Edit</button>
          <button onClick={handleDelete} style={{ color: "red" }}>
            Delete
          </button>
        </>
      )}
      <ul>
        <div>
          <li>
            <Link href={`/worlds/${id}/characters`}>Characters</Link>
          </li>
        </div>
        <li>
          <div>
            <Link href={`/worlds/${id}/factions`}>Factions</Link>
          </div>
        </li>
        <li>
          <div>
            <Link href={`/worlds/${id}/bbegs`}>Bbegs</Link>
          </div>
        </li>
        <li>
          <div>
            <Link href={`/worlds/${id}/npcs`}>Npcs</Link>
          </div>
        </li>
        <li>
          <div>
            <Link href={`/worlds/${id}/loreEntry`}>LoreEntries</Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
