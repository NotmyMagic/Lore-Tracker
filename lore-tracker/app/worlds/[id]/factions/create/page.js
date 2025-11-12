"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createFaction } from "../../../../../lib/api";

export default function CreateFactionPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    type: "",
    headquarters: "",
    goals: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createFaction(id, form);
      router.push(`/worlds/${id}/factions`);
    } catch (err) {
      console.error(err);
      setError("Failed to create faction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Faction</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />
        <input
          placeholder="Headquarters"
          value={form.headquarters}
          onChange={(e) => setForm({ ...form, headquarters: e.target.value })}
        />
        <input
          placeholder="Goals"
          value={form.goals}
          onChange={(e) => setForm({ ...form, goals: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Faction"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
