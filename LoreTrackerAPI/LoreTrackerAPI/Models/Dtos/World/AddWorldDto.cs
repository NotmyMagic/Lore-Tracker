namespace LoreTrackerAPI.Models.Dtos.World
{
    public class AddWorldDto
    {
        public string Name { get; set; } = string.Empty!;
        public string? Description { get; set; }
    }
}
