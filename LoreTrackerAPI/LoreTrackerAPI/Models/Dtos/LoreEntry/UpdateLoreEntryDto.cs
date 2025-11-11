namespace LoreTrackerAPI.Models.Dtos.LoreEntry
{
    public class UpdateLoreEntryDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Category { get; set; }
        public string? Description { get; set; }
    }
}
