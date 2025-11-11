namespace LoreTrackerAPI.Models.Entities
{
    public class World
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Character> Characters { get; set; } = new List<Character>();
        public ICollection<Bbeg> Bbegs { get; set; } = new List<Bbeg>();
        public ICollection<Npc> Npcs { get; set; } = new List<Npc>();
        public ICollection<Faction> Factions { get; set; } = new List<Faction>();
        public ICollection<LoreEntry> LoreEntries { get; set; } = new List<LoreEntry>();
    }
}
