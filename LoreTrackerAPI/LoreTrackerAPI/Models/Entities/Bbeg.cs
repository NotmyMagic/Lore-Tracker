namespace LoreTrackerAPI.Models.Entities
{
    public class Bbeg
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Title { get; set; }
        public string? Species { get; set; }
        public string? Goal { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //Foreign Key
        public int WorldId { get; set; }

        // Navigation Property
        public World? World { get; set; }
    }
}
