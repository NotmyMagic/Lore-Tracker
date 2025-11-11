namespace LoreTrackerAPI.Models.Entities
{
    public class Character
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Race { get; set; }
        public string? Class { get; set; }
        public string? Alignment { get; set; }
        public string? Background { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //Foreign Key
        public int WorldId { get; set; }

        // Navigation Property
        public World? World { get; set; }
    }
}
