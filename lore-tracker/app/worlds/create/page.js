"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createWorld } from "../../../lib/api";

export default function CreateWorldPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createWorld(form);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Create world failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New World</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button type="submit" disabled={loading}>
          Create World
        </button>
      </form>
    </div>
  );
}
