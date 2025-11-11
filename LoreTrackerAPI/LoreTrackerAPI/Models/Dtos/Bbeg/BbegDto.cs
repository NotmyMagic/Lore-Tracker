namespace LoreTrackerAPI.Models.Dtos.Bbeg
{
    public class BbegDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string? Species { get; set; }
        public string? Goal { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

        //relationship info
        public int WorldId { get; set; }
        public string? WorldName { get; set; }

    }
}
