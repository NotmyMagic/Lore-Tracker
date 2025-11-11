namespace LoreTrackerAPI.Models.Dtos.Faction
{
    public class UpdateFactionDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Type { get; set; }
        public string? Headquarters { get; set; }
        public string? Goals { get; set; }
        public string? Description { get; set; }
    }
}
