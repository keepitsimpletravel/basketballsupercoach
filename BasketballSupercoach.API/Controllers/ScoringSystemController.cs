using System.Threading.Tasks;
using BasketballSupercoach.API.Data;
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
        
    }
}