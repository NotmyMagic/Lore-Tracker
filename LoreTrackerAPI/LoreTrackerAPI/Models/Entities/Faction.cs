namespace LoreTrackerAPI.Models.Entities
{
    public class Faction
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Type { get; set; }
        public string? Headquarters { get; set; }
        public string? Goals { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //Foreign Key
        public int WorldId { get; set; }

        // Navigation Property
        public World? World { get; set; }
    }
}
