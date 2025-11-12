const API_URL = "https://localhost:7069/api";

// Worlds
export async function fetchWorlds() {
  const res = await fetch(`${API_URL}/world`);
  return res.json();
}

export async function fetchWorld(id) {
  const res = await fetch(`${API_URL}/world/${id}`);
  return res.json();
}

export async function createWorld(createWorld) {
  const res = await fetch(`${API_URL}/world`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(createWorld),
  });

  if (!res.ok) {
    throw new Error("World create failed");
  }

  return res.json();
}

export async function updateWorld(id, updateWorld) {
  const res = await fetch(`${API_URL}/world/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateWorld),
  });

  if (!res.ok) throw new Error("World update failed");
  return res.json();
}

export async function deleteWorld(id) {
  const res = await fetch(`${API_URL}/world/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("World delete failed");
  return true;
}
// ===========================================================================
//Characters
export async function fetchCharacters(id) {
  const res = await fetch(`${API_URL}/world/${id}/characters`);
  return res.json();
}

export async function fetchCharacter(id) {
  const res = await fetch(`${API_URL}/character/${id}`);
  return res.json();
}

export async function createCharacter(worldId, createCharacter) {
  const payload = { ...createCharacter, worldId: Number(worldId) };

  const res = await fetch(`${API_URL}/character`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Character create failed");
  }

  return res.json();
}

export async function updateCharacter(id, updateCharacter) {
  const res = await fetch(`${API_URL}/character/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateCharacter),
  });

  if (!res.ok) throw new Error("Character update failed");
  return res.json();
}

export async function deleteCharacter(id) {
  const res = await fetch(`${API_URL}/character/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Character delete failed");
  return true;
}
// ===========================================================================
// Factions
export async function fetchFactions(id) {
  const res = await fetch(`${API_URL}/world/${id}/factions`);
  return res.json();
}

export async function fetchFaction(id) {
  const res = await fetch(`${API_URL}/faction/${id}`);
  return res.json();
}

export async function createFaction(worldId, createFaction) {
  const payload = { ...createFaction, worldId: Number(worldId) };

  const res = await fetch(`${API_URL}/faction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Faction create failed");
  }

  return res.json();
}

export async function updateFaction(id, updateFaction) {
  const res = await fetch(`${API_URL}/faction/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateFaction),
  });

  if (!res.ok) throw new Error("Faction update failed");
  return res.json();
}

export async function deleteFaction(id) {
  const res = await fetch(`${API_URL}/faction/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Faction delete failed");
  return true;
}
// ===========================================================================
//Bbegs
export async function fetchBbegs(id) {
  const res = await fetch(`${API_URL}/world/${id}/bbegs`);
  return res.json();
}

export async function fetchBbeg(id) {
  const res = await fetch(`${API_URL}/bbeg/${id}`);
  return res.json();
}

export async function createBbeg(worldId, createBbeg) {
  const payload = { ...createBbeg, worldId: Number(worldId) };

  const res = await fetch(`${API_URL}/bbeg`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Bbeg create failed");
  }

  return res.json();
}

export async function updateBbeg(id, updateBbeg) {
  const res = await fetch(`${API_URL}/bbeg/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateBbeg),
  });

  if (!res.ok) throw new Error("Bbeg update failed");
  return res.json();
}

export async function deleteBbeg(id) {
  const res = await fetch(`${API_URL}/bbeg/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Bbeg delete failed");
  return true;
}
// ===========================================================================
//Npcs
export async function fetchNpcs(id) {
  const res = await fetch(`${API_URL}/world/${id}/npcs`);
  return res.json();
}

export async function fetchNpc(id) {
  const res = await fetch(`${API_URL}/npc/${id}`);
  return res.json();
}

export async function createNpc(worldId, createNpc) {
  const payload = { ...createNpc, worldId: Number(worldId) };

  const res = await fetch(`${API_URL}/npc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Npc create failed");
  }

  return res.json();
}

export async function updateNpc(id, updateNpc) {
  const res = await fetch(`${API_URL}/npc/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateNpc),
  });

  if (!res.ok) throw new Error("Npc update failed");
  return res.json();
}

export async function deleteNpc(id) {
  const res = await fetch(`${API_URL}/npc/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Npc delete failed");
  return true;
}
// ===========================================================================
//LoreEntry
export async function fetchLoreEntries(id) {
  const res = await fetch(`${API_URL}/world/${id}/loreentries`);
  return res.json();
}

export async function fetchLoreEntry(id) {
  const res = await fetch(`${API_URL}/loreEntry/${id}`);
  return res.json();
}

export async function createLoreEntry(worldId, createLoreEntry) {
  const payload = { ...createLoreEntry, worldId: Number(worldId) };

  const res = await fetch(`${API_URL}/loreEntry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("LoreEntry create failed");
  }

  return res.json();
}

export async function updateLoreEntry(id, updateLoreEntry) {
  const res = await fetch(`${API_URL}/loreEntry/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateLoreEntry),
  });

  if (!res.ok) throw new Error("LoreEntry update failed");
  return res.json();
}

export async function deleteLoreEntry(id) {
  const res = await fetch(`${API_URL}/loreEntry/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("LoreEntry delete failed");
  return true;
}
