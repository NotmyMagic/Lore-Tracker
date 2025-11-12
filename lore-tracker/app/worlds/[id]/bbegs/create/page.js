"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createBbeg } from "../../../../../lib/api";

export default function CreateBbegPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    title: "",
    species: "",
    goal: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createBbeg(id, form);
      router.push(`/worlds/${id}/bbegs`);
    } catch (err) {
      console.error(err);
      setError("Failed to create bbeg.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Bbeg</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Species"
          value={form.speices}
          onChange={(e) => setForm({ ...form, speices: e.target.value })}
        />
        <input
          placeholder="Goal"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Bbeg"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
