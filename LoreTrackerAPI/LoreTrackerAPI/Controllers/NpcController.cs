using LoreTrackerAPI.Data;
using LoreTrackerAPI.Models.Dtos.Npc;
using LoreTrackerAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NpcController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        public NpcController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/npcs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NpcDto>>> GetNpcs()
        {
            var npcs = await dbContext.Npcs
                .Include(n => n.World)
                .Select(n => new NpcDto
                {
                    Id = n.Id,
                    Name = n.Name,
                    Role = n.Role,
                    Location = n.Location,
                    Description = n.Description,
                    CreatedAt = n.CreatedAt,
                    WorldId = n.WorldId,
                    WorldName = n.World != null ? n.World.Name : null
                })
                .ToListAsync();

            return Ok(npcs);
        }

        // GET: api/npcs/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<NpcDto>> GetNpc(int id)
        {
            var npcs = await dbContext.Npcs
                .Include(n => n.World)
                .Where(n => n.Id == id)
                .Select(n => new NpcDto
                {
                    Id = n.Id,
                    Name = n.Name,
                    Role = n.Role,
                    Location = n.Location,
                    Description = n.Description,
                    CreatedAt = n.CreatedAt,
                    WorldId = n.WorldId,
                    WorldName = n.World != null ? n.World.Name : null
                })
                .FirstOrDefaultAsync();

            if (npcs == null)
                return NotFound();

            return Ok(npcs);
        }

        // POST: api/npcs
        [HttpPost]
        public async Task<ActionResult<NpcDto>> CreateNpc(AddNpcDto dto)
        {
            var worldExists = await dbContext.Worlds.AnyAsync(w => w.Id == dto.WorldId);
            if (!worldExists)
                return BadRequest($"World with ID {dto.WorldId} does not exist.");

            var npc = new Npc
            {
                Name = dto.Name,
                Role = dto.Role,
                Location = dto.Location,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                WorldId = dto.WorldId
            };

            dbContext.Npcs.Add(npc);
            await dbContext.SaveChangesAsync();

            // Return DTO after creation
            var result = new NpcDto
            {
                Id = npc.Id,
                Name = npc.Name,
                Role = npc.Role,
                Location = npc.Location,
                Description = npc.Description,
                CreatedAt = npc.CreatedAt,
                WorldId = npc.WorldId
            };

            return CreatedAtAction(nameof(GetNpc), new { id = npc.Id }, result);
        }

        // PUT: api/npcs/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNpc(int id, UpdateNpcDto dto)
        {
            var npc = await dbContext.Npcs.FindAsync(id);
            if (npc == null)
                return NotFound();

            npc.Name = dto.Name;
            npc.Role = dto.Role;
            npc.Location = dto.Location;
            npc.Description = dto.Description;

            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/npcs/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNpc(int id)
        {
            var npc = await dbContext.Npcs.FindAsync(id);
            if (npc == null)
                return NotFound();

            dbContext.Npcs.Remove(npc);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
