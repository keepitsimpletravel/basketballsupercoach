using System.Collections.Generic;
using System.Threading.Tasks;
// using AutoMapper;
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
    public class TeamDetailController : ControllerBase
    {
        private readonly IBasketballSupercoachRepository _repo;
        public TeamDetailController(IBasketballSupercoachRepository repo) 
        {
            _repo = repo;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTeamDetail(TeamDetailForPlayerDto teamDetailDto)
        {
            var teamDetailToCreate = new TeamDetail
            {
                Captain = teamDetailDto.Captain,
                Emergency = teamDetailDto.Emergency,
                SixthMan = teamDetailDto.SixthMan,
                Active = 1,
                PlayerId = teamDetailDto.PlayerId,
                Position = teamDetailDto.Position,
                UserId = teamDetailDto.UserId
            };
            var createdTeamDetail = await _repo.CreateTeamDetailRecord(teamDetailToCreate);
            return StatusCode(201);
        }


        // [HttpGet]
        // public async Task<IActionResult> GetTeamPlayers()
        // {
            
        // }
    //     {
    //         var players = await _repo.GetPlayers();

    //         // var playersToReturn = _mapper.Map<IEnumerable<PlayerForListDto>>(players);
            
    //         // return Ok(playersToReturn);

    //         return Ok(players);
    //     }

    //     [HttpGet]
    //     public async Task<IActionResult> GetPlayers()
    //     {
    //         var players = await _repo.GetPlayers();

    //         // var playersToReturn = _mapper.Map<IEnumerable<PlayerForListDto>>(players);
            
    //         // return Ok(playersToReturn);

    //         return Ok(players);
    //     }

    //     [HttpGet("filtered/{pos}")]
    //     public async Task<IActionResult> GetSpecificPlayers(int pos)
    //     {
    //         var players = await _repo.GetSpecificPlayers(pos);

    //         return Ok(players);
    //     }

    //     [HttpGet("{id}")]
    //     public async Task<IActionResult> GetPlayer(int id)
    //     {
    //         var player = await _repo.GetPlayer(id);

    //         // var playerToReturn = _mapper.Map<PlayerForListDto>(player);

    //         // return Ok(playerToReturn);
    //         return Ok(player);
    //     }
    // }
    }
}

