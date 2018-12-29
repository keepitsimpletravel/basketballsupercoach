using System.Collections.Generic;
using System.Threading.Tasks;
using BasketballSupercoach.API.Data;
using BasketballSupercoach.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BasketballSupercoach.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamRankController : ControllerBase
    {
         private readonly IBasketballSupercoachRepository _repo;
        // private readonly IMapper _mapper;
        public TeamRankController(IBasketballSupercoachRepository repo) //, IMapper mapper)
        {
            // _mapper = mapper; 
            _repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoundRank(int id)
        {
            var rank = await _repo.GetRoundRank(id);
            return Ok(rank);
        }

        [HttpGet("score/{id}")]
        public async Task<IActionResult> GetRoundScore(int id)
        {
            var score = await _repo.GetRoundScore(id);
            return Ok(score);
        }

        [HttpGet("totalscore/{id}")]
        public async Task<IActionResult> GetTotalScore(int id)
        {
            var score = await _repo.GetTotalScore(id);
            return Ok(score);
        }

        [HttpGet("totalrank/{id}")]
        public async Task<IActionResult> GetTotalRank(int id)
        {
            var rank = await _repo.GetTotalRank(id);
            return Ok(rank);
        }

        [HttpGet("getround/")]
        public async Task<IActionResult> GetCurrentRound()
        {
            var round = await _repo.GetCurrentRound();
            return Ok(round);
        }
    }
}