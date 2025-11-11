namespace LoreTrackerAPI.Models.Dtos.Bbeg
{
    public class AddBbegDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string? Species { get; set; }
        public string? Goal { get; set; }
        public string? Description { get; set; }
        public int WorldId { get; set; }
    }
}
