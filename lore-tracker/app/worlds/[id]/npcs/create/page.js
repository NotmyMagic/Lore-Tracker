"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createNpc } from "../../../../../lib/api";

export default function CreateNpcPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    role: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createNpc(id, form);
      router.push(`/worlds/${id}/npcs`);
    } catch (err) {
      console.error(err);
      setError("Failed to create npc.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Npc</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Npc"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
