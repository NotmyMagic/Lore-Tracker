"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  fetchCharacters,
  updateCharacter,
  deleteCharacter,
} from "../../../../lib/api";

export default function CharactersPage() {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    race: "",
    class: "",
    alignment: "",
    background: "",
    description: "",
  });

  useEffect(() => {
    fetchCharacters(id).then(setCharacters).catch(console.error);
  }, [id]);

  if (!characters) return <p>Loading world...</p>;

  const handleEditClick = (character) => {
    setEditing(character.id);
    setForm({
      name: character.name,
      race: character.race,
      class: character.class,
      alignment: character.alignment,
      background: character.background,
      description: character.description,
    });
  };

  const handleDeleteClick = async (characterId) => {
    try {
      await deleteCharacter(characterId);
      setCharacters(characters.filter((c) => c.id !== characterId));
    } catch (error) {
      console.error("Failed to delete character:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateCharacter(editing, form);
      setCharacters(characters.map((c) => (c.id === editing ? updated : c)));
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
      console.error("Failed to update character:", error);
    }
  };

  return (
    <div>
      <h1>Characters</h1>
      <Link href={`/worlds/${id}/characters/create`}>
        <button>Create New Character</button>
      </Link>
      <ul>
        {characters.map((c) => (
          <li key={c.id}>
            {editing === c.id ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Name"
                />
                <input
                  name="race"
                  value={form.race}
                  onChange={handleFormChange}
                  placeholder="Race"
                />
                <input
                  name="class"
                  value={form.class}
                  onChange={handleFormChange}
                  placeholder="Class"
                />
                <input
                  name="alignment"
                  value={form.alignment}
                  onChange={handleFormChange}
                  placeholder="Alignment"
                />
                <input
                  name="background"
                  value={form.background}
                  onChange={handleFormChange}
                  placeholder="Background"
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
                {c.name}, {c.race}, {c.class}, {c.alignment}, {c.background},
                {c.description}
                <button onClick={() => handleEditClick(c)}>Edit</button>
                <button onClick={() => handleDeleteClick(c.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
