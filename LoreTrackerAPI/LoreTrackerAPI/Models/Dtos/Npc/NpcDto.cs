namespace LoreTrackerAPI.Models.Dtos.Npc
{
    public class NpcDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Role { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }

        //relationship info
        public int WorldId { get; set; }
        public string? WorldName { get; set; }

    }
}
