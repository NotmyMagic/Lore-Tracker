using LoreTrackerAPI.Data;
using LoreTrackerAPI.Models.Dtos.Faction;
using LoreTrackerAPI.Models.Dtos.LoreEntry;
using LoreTrackerAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoreEntryController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        public LoreEntryController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/loreentries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoreEntryDto>>> GetLoreEntries()
        {
            var loreEntries = await dbContext.LoreEntries
                .Include(l => l.World)
                .Select(l => new LoreEntryDto
                {
                    Id = l.Id,
                    Name = l.Name,
                    Category = l.Category,
                    Description = l.Description,
                    CreatedAt = l.CreatedAt,
                    WorldId = l.WorldId,
                    WorldName = l.World != null ? l.World.Name : null
                })
                .ToListAsync();

            return Ok(loreEntries);
        }

        // GET: api/loreentries/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<LoreEntryDto>> GetLoreEntry(int id)
        {
            var loreEntry = await dbContext.LoreEntries
                .Include(l => l.World)
                .Where(l => l.Id == id)
                .Select(l => new LoreEntryDto
                {
                    Id = l.Id,
                    Name = l.Name,
                    Category = l.Category,
                    Description = l.Description,
                    CreatedAt = l.CreatedAt,
                    WorldId = l.WorldId,
                    WorldName = l.World != null ? l.World.Name : null
                })
                .FirstOrDefaultAsync();

            if (loreEntry == null)
                return NotFound();

            return Ok(loreEntry);
        }

        // POST: api/loreentries
        [HttpPost]
        public async Task<ActionResult<LoreEntryDto>> CreateLoreEntry(AddLoreEntryDto dto)
        {
            var worldExists = await dbContext.Worlds.AnyAsync(w => w.Id == dto.WorldId);
            if (!worldExists)
                return BadRequest($"World with ID {dto.WorldId} does not exist.");

            var loreEntry = new LoreEntry
            {
                Name = dto.Name,
                Category = dto.Category,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                WorldId = dto.WorldId
            };

            dbContext.LoreEntries.Add(loreEntry);
            await dbContext.SaveChangesAsync();

            // Return DTO after creation
            var result = new LoreEntryDto
            {
                Id = loreEntry.Id,
                Name = loreEntry.Name,
                Category = loreEntry.Category,
                Description = loreEntry.Description,
                CreatedAt = loreEntry.CreatedAt,
                WorldId = loreEntry.WorldId
            };

            return CreatedAtAction(nameof(GetLoreEntries), new { id = loreEntry.Id }, result);
        }

        // PUT: api/loreentries/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLoreEntry(int id, UpdateLoreEntryDto dto)
        {
            var loreEntry = await dbContext.LoreEntries.FindAsync(id);
            if (loreEntry == null)
                return NotFound();

            loreEntry.Name = dto.Name;
            loreEntry.Category = dto.Category;
            loreEntry.Description = dto.Description;

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/loreEntries/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoreEntry(int id)
        {
            var loreEntry = await dbContext.LoreEntries.FindAsync(id);
            if (loreEntry == null)
                return NotFound();

            dbContext.LoreEntries.Remove(loreEntry);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
