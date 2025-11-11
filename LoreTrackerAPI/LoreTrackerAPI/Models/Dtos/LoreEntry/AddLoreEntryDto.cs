namespace LoreTrackerAPI.Models.Dtos.LoreEntry
{
    public class AddLoreEntryDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Category { get; set; }
        public string? Description { get; set; }
        public int WorldId { get; set; }
    }
}
