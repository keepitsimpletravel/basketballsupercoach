using System.Threading.Tasks;
using BasketballSupercoach.API.Data;
using BasketballSupercoach.API.Dtos;
using BasketballSupercoach.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BasketballSupercoach.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ScoringSystemController : ControllerBase
    {
        private readonly IBasketballSupercoachRepository _repo;

         public ScoringSystemController(IBasketballSupercoachRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetScoringSystem()
        {
            var scoringSystem = await _repo.GetScoringSystem();
            return Ok(scoringSystem);
        }

        [HttpPut("updateteamdetail")]
        public async Task<IActionResult> UpdateScoringSystem(ScoringSystemDto scoreDto)
        {
            var scoringSystemToUpdate = new ScoringSystem
            {
                Id = scoreDto.Id,
                Points = scoreDto.Points,
                ORebounds = scoreDto.ORebounds,
                DRebounds = scoreDto.DRebounds,
                Assists = scoreDto.Assists,
                Steals = scoreDto.Steals,
                Blocks = scoreDto.Blocks,
                TripleDouble = scoreDto.TripleDouble,
                Turnovers = scoreDto.Turnovers,
                MadeThrees = scoreDto.MadeThrees,
                Minutes = scoreDto.Minutes,
                QuadDouble = scoreDto.QuadDouble
            };

            return null;
        }
        
    }
}