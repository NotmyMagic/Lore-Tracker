"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchWorlds } from "../../lib/api";

export default function WorldPage() {
  const [worlds, setWorlds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorlds() {
      try {
        const data = await fetchWorlds();
        setWorlds(data);
      } catch (err) {
        console.error("Error fetching worlds:", err);
        setError("Failed to load worlds");
      } finally {
        setLoading(false);
      }
    }
    loadWorlds();
  }, []);

  if (loading) return <p>Loading world...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lore Tracker</h1>
      <p>Choose a world to explore:</p>

      {worlds.length === 0 ? (
        <p>No worlds found.</p>
      ) : (
        <ul>
          {worlds.map((world) => (
            <li key={world.id}>
              <Link href={`/worlds/${world.id}`}>{world.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <div>
        <Link href={"/worlds/create"}>Create New World</Link>
      </div>
    </div>
  );
}
