using LoreTrackerAPI.Data;
using LoreTrackerAPI.Models.Dtos.Character;
using LoreTrackerAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        public CharacterController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/world/{worldId}/characters
        [HttpGet("/api/world/{worldId}/characters")]
        public async Task<ActionResult<IEnumerable<CharacterDto>>> GetCharactersByWorld(int worldId)
        {
            var characters = await dbContext.Characters
                .Where(c => c.WorldId == worldId)
                .Include(c => c.World)
                .Select(c => new CharacterDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Race = c.Race,
                    Class = c.Class,
                    Alignment = c.Alignment,
                    Background = c.Background,
                    Description = c.Description,
                    CreatedAt = c.CreatedAt,
                    WorldId = c.WorldId,
                    WorldName = c.World != null ? c.World.Name : null
                })
                .ToListAsync();

            return Ok(characters);
        }

        // GET: api/characters/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CharacterDto>> GetCharacter(int id)
        {
            var character = await dbContext.Characters
                .Include(c => c.World)
                .Where(c => c.Id == id)
                .Select(c => new CharacterDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Race = c.Race,
                    Class = c.Class,
                    Alignment = c.Alignment,
                    Background = c.Background,
                    Description = c.Description,
                    CreatedAt = c.CreatedAt,
                    WorldId = c.WorldId,
                    WorldName = c.World != null ? c.World.Name : null
                })
                .FirstOrDefaultAsync();

            if (character == null)
                return NotFound();

            return Ok(character);
        }

        // POST: api/characters
        [HttpPost]
        public async Task<ActionResult<CharacterDto>> CreateCharacter(AddCharacterDto dto)
        {
            var worldExists = await dbContext.Worlds.AnyAsync(w => w.Id == dto.WorldId);
            if (!worldExists)
                return BadRequest($"World with ID {dto.WorldId} does not exist.");

            var character = new Character
            {
                Name = dto.Name,
                Race = dto.Race,
                Class = dto.Class,
                Alignment = dto.Alignment,
                Background = dto.Background,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow,
                WorldId = dto.WorldId
            };

            dbContext.Characters.Add(character);
            await dbContext.SaveChangesAsync();

            // Return DTO after creation
            var result = new CharacterDto
            {
                Id = character.Id,
                Name = character.Name,
                Race = character.Race,
                Class = character.Class,
                Alignment = character.Alignment,
                Background = character.Background,
                Description = character.Description,
                CreatedAt = character.CreatedAt,
                WorldId = character.WorldId
            };

            return CreatedAtAction(nameof(GetCharacter), new { id = character.Id }, result);
        }

        // PUT: api/characters/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCharacter(int id, UpdateCharacterDto dto)
        {
            var character = await dbContext.Characters.FindAsync(id);
            if (character == null)
                return NotFound();

            character.Name = dto.Name;
            character.Race = dto.Race;
            character.Class = dto.Class;
            character.Alignment = dto.Alignment;
            character.Background = dto.Background;
            character.Description = dto.Description;

            await dbContext.SaveChangesAsync();

            return Ok(character);
        }

        // DELETE: api/characters/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var character = await dbContext.Characters.FindAsync(id);
            if (character == null)
                return NotFound();

            dbContext.Characters.Remove(character);
            await dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
