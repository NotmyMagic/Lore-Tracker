namespace LoreTrackerAPI.Models.Dtos.Character
{
    public class CharacterDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Race { get; set; }
        public string? Class { get; set; }
        public string? Alignment { get; set; }
        public string? Background { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        
        //relationship info
        public int WorldId { get; set; }
        public string? WorldName { get; set; }
    }
}
