using LoreTrackerAPI.Data;
using LoreTrackerAPI.Models.Dtos.World;
using LoreTrackerAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LoreTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorldController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        public WorldController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllWorlds()
        {
            var allWorlds = dbContext.Worlds.ToList();

            return Ok(allWorlds);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetWorldsById(int id)
        {
            var world = dbContext.Worlds.Find(id);

            if (world is null)
            {
                return NotFound();
            }
            return Ok(world);
        }

        [HttpPost]
        public IActionResult AddWorld(AddWorldDto addWorldDto)
        {
            var worldEntity = new World()
            {
                Name = addWorldDto.Name,
                Description = addWorldDto.Description,
            };


            dbContext.Worlds.Add(worldEntity);
            dbContext.SaveChanges();

            return Ok(worldEntity);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateWorld(int id, UpdateWorldDto updateWorldDto)
        {
            var world = dbContext.Worlds.Find(id);

            if (world is null)
            {
                return NotFound();
            }

            world.Name = updateWorldDto.Name;
            world.Description = updateWorldDto.Description;

            dbContext.SaveChanges();

            return Ok(world);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteWorld(int id)
        {
            var world = dbContext.Worlds.Find(id);

            if (world is null)
            {
                return NotFound();
            }

            dbContext.Worlds.Remove(world);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
