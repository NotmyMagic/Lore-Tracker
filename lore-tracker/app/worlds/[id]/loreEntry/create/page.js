"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createLoreEntry } from "../../../../../lib/api";

export default function CreateLoreEntryPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createLoreEntry(id, form);
      router.push(`/worlds/${id}/loreEntry`);
    } catch (err) {
      console.error(err);
      setError("Failed to create loreEntry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create LoreEntry</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create LoreEntry"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
