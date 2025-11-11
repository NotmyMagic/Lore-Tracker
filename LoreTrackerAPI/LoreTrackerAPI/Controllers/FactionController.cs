using LoreTrackerAPI.Data;
using LoreTrackerAPI.Models.Dtos.Faction;
using LoreTrackerAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FactionController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        public FactionController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/factions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FactionDto>>> GetFactions()
        {
            var factions = await dbContext.Factions
                .Include(f => f.World)
                .Select(f => new FactionDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    Type = f.Type,
                    Headquarters = f.Headquarters,
                    Goals = f.Goals,
                    Description = f.Description,
                    CreatedAt = f.CreatedAt,
                    WorldId = f.WorldId,
                    WorldName = f.World != null ? f.World.Name : null
                })
                .ToListAsync();

            return Ok(factions);
        }

        // GET: api/factions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FactionDto>> GetFactions(int id)
        {
            var faction = await dbContext.Factions
                .Include(f => f.World)
                .Where(f => f.Id == id)
                .Select(f => new FactionDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    Type = f.Type,
                    Headquarters = f.Headquarters,
                    Goals= f.Goals,
                    Description = f.Description,
                    CreatedAt = f.CreatedAt,
                    WorldId = f.WorldId,
                    WorldName = f.World != null ? f.World.Name : null
                })
                .FirstOrDefaultAsync();

            if (faction == null)
                return NotFound();

            return Ok(faction);
        }

        // POST: api/factions
        [HttpPost]
        public async Task<ActionResult<FactionDto>> CreateFaction(AddFactionDto dto)
        {
            var worldExists = await dbContext.Worlds.AnyAsync(w => w.Id == dto.WorldId);
            if (!worldExists)
                return BadRequest($"World with ID {dto.WorldId} does not exist.");

            var faction = new Faction
            {
                Name = dto.Name,
                Type = dto.Type,
                Headquarters = dto.Headquarters,
                Goals = dto.Goals,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                WorldId = dto.WorldId
            };

            dbContext.Factions.Add(faction);
            await dbContext.SaveChangesAsync();

            // Return DTO after creation
            var result = new FactionDto
            {
                Id = faction.Id,
                Name = faction.Name,
                Type = faction.Type,
                Headquarters = faction.Headquarters,
                Goals = faction.Goals,
                Description = faction.Description,
                CreatedAt = faction.CreatedAt,
                WorldId = faction.WorldId
            };

            return CreatedAtAction(nameof(GetFactions), new { id = faction.Id }, result);
        }

        // PUT: api/factions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFaction(int id, UpdateFactionDto dto)
        {
            var faction = await dbContext.Factions.FindAsync(id);
            if (faction == null)
                return NotFound();

            faction.Name = dto.Name;
            faction.Type = dto.Type;
            faction.Headquarters = dto.Headquarters;
            faction.Goals = dto.Goals;
            faction.Description = dto.Description;

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/factions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaction(int id)
        {
            var faction = await dbContext.Factions.FindAsync(id);
            if (faction == null)
                return NotFound();

            dbContext.Factions.Remove(faction);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
