using System.Collections.Generic;
using System.Threading.Tasks;
// using AutoMapper;
using BasketballSupercoach.API.Data;
using BasketballSupercoach.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BasketballSupercoach.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IBasketballSupercoachRepository _repo;
        // private readonly IMapper _mapper;
        public PlayersController(IBasketballSupercoachRepository repo) //, IMapper mapper)
        {
            // _mapper = mapper; 
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlayers()
        {
            var players = await _repo.GetPlayers();

            // var playersToReturn = _mapper.Map<IEnumerable<PlayerForListDto>>(players);
            
            // return Ok(playersToReturn);

            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer(int id)
        {
            var player = await _repo.GetPlayer(id);

            // var playerToReturn = _mapper.Map<PlayerForListDto>(player);

            // return Ok(playerToReturn);
            return Ok(player);
        }
    }
}

