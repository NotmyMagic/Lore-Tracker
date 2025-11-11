namespace LoreTrackerAPI.Models.Dtos.Npc
{
    public class UpdateNpcDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Role { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
    }
}
