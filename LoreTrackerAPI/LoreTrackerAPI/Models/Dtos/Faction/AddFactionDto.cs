namespace LoreTrackerAPI.Models.Dtos.Faction
{
    public class AddFactionDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Type { get; set; }
        public string? Headquarters { get; set; }
        public string? Goals { get; set; }
        public string? Description { get; set; }
        public int WorldId { get; set; }
    }
}
