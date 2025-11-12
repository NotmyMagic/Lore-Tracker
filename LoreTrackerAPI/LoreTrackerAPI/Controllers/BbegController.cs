using LoreTrackerAPI.Data;
using LoreTrackerAPI.Models.Dtos.Bbeg;
using LoreTrackerAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BbegController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        public BbegController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/world/{worldId}/bbegs
        [HttpGet("/api/world/{worldId}/bbegs")]
        public async Task<ActionResult<IEnumerable<BbegDto>>> GetBbegsByWorld(int worldId)
        {
            var bbegs = await dbContext.Bbegs
                .Where(b => b.WorldId == worldId)
                .Include(b => b.World)
                .Select(b => new BbegDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Title = b.Title,
                    Species = b.Species,
                    Goal = b.Goal,
                    Description = b.Description,
                    CreatedAt = b.CreatedAt,
                    WorldId = b.WorldId,
                    WorldName = b.World != null ? b.World.Name : null
                })
                .ToListAsync();

            return Ok(bbegs);
        }

        // GET: api/bbegs/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BbegDto>> GetBbeg(int id)
        {
            var bbeg = await dbContext.Bbegs
                .Include(b => b.World)
                .Where(b => b.Id == id)
                .Select(b => new BbegDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Title = b.Title,
                    Species = b.Species,
                    Goal = b.Goal,
                    Description = b.Description,
                    CreatedAt = b.CreatedAt,
                    WorldId = b.WorldId,
                    WorldName = b.World != null ? b.World.Name : null
                })
                .FirstOrDefaultAsync();

            if (bbeg == null)
                return NotFound();

            return Ok(bbeg);
        }

        // POST: api/bbegs
        [HttpPost]
        public async Task<ActionResult<BbegDto>> CreateBbeg(AddBbegDto dto)
        {
            var worldExists = await dbContext.Worlds.AnyAsync(w => w.Id == dto.WorldId);
            if (!worldExists)
                return BadRequest($"World with ID {dto.WorldId} does not exist.");

            var bbeg = new Bbeg
            {
                Name = dto.Name,
                Title = dto.Title,
                Species = dto.Species,
                Goal = dto.Goal,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                WorldId = dto.WorldId
            };

            dbContext.Bbegs.Add(bbeg);
            await dbContext.SaveChangesAsync();

            // Return DTO after creation
            var result = new BbegDto
            {
                Id = bbeg.Id,
                Name = bbeg.Name,
                Species = bbeg.Species,
                Goal = bbeg.Goal,
                Description = bbeg.Description,
                CreatedAt = bbeg.CreatedAt,
                WorldId = bbeg.WorldId
            };

            return CreatedAtAction(nameof(GetBbeg), new { id = bbeg.Id }, result);
        }

        // PUT: api/bbegs/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBbeg(int id, UpdateBbegDto dto)
        {
            var bbeg = await dbContext.Bbegs.FindAsync(id);
            if (bbeg == null)
                return NotFound();

            bbeg.Name = dto.Name;
            bbeg.Species = dto.Species;
            bbeg.Goal = dto.Goal;
            bbeg.Description = dto.Description;

            await dbContext.SaveChangesAsync();

            return Ok(bbeg);
        }

        // DELETE: api/bbegs/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBbeg(int id)
        {
            var bbeg = await dbContext.Bbegs.FindAsync(id);
            if (bbeg == null)
                return NotFound();

            dbContext.Bbegs.Remove(bbeg);
            await dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
