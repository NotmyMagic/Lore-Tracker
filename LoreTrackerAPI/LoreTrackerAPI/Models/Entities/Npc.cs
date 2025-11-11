namespace LoreTrackerAPI.Models.Entities
{
    public class Npc
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Role { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int WorldId { get; set; }
        public World? World { get; set; }
    }
}
