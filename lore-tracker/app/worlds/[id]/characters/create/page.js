"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createCharacter } from "../../../../../lib/api";

export default function CreateCharacterPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    race: "",
    class: "",
    alignment: "",
    background: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createCharacter(id, form);
      router.push(`/worlds/${id}/characters`);
    } catch (err) {
      console.error(err);
      setError("Failed to create character.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Character</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Race"
          value={form.race}
          onChange={(e) => setForm({ ...form, race: e.target.value })}
        />
        <input
          placeholder="Class"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
        />
        <input
          placeholder="Alignment"
          value={form.alignment}
          onChange={(e) => setForm({ ...form, alignment: e.target.value })}
        />
        <input
          placeholder="Background"
          value={form.background}
          onChange={(e) => setForm({ ...form, background: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Character"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
