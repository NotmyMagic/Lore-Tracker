namespace LoreTrackerAPI.Models.Dtos.LoreEntry
{
    public class LoreEntryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Category { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

        //relationship info
        public int WorldId { get; set; }
        public string? WorldName { get; set; }

    }
}
