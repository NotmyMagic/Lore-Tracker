namespace LoreTrackerAPI.Models.Dtos.Faction
{
    public class FactionDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Type { get; set; }
        public string? Headquarters { get; set; }
        public string? Goals { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

        //relationship info
        public int WorldId { get; set; }
        public string? WorldName { get; set; }

    }
}
