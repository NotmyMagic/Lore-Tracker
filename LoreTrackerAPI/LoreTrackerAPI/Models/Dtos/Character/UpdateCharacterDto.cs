namespace LoreTrackerAPI.Models.Dtos.Character
{
    public class UpdateCharacterDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Race { get; set; }
        public string? Class { get; set; }
        public string? Alignment { get; set; }
        public string? Background { get; set; }
        public string? Description { get; set; }
    }
}
