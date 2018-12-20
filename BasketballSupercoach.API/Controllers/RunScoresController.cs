using System.Threading.Tasks;
using BasketballSupercoach.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BasketballSupercoach.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RunScoresController : ControllerBase
    {
        private readonly IBasketballSupercoachRepository _repo;

        public RunScoresController(IBasketballSupercoachRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{value}")]
        public async Task<IActionResult> RunScoresForDate(string value)
        {
            var result = await _repo.RunScoresForDate(value);
            return Ok(result);
        }
    }
}