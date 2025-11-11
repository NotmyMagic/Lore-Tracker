namespace LoreTrackerAPI.Models.Entities
{
    public class LoreEntry
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Category { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //Foreign Key
        public int WorldId { get; set; }

        // Navigation Property
        public World? World { get; set; }
    }
}
