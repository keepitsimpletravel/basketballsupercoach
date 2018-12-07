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

        // [HttpGet("{userId}")]
        // public async Task<IActionResult> GetTeamDetailsForUser(int userId)
        // {
        //     var teamDetails = await _repo.GetTeamDetailsForUser(userId);
        //     return Ok(teamDetails);
        // }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetPlayerCardsForUser(int userId)
        {
            var playerCards = await _repo.GetPlayerCardsForUser(userId);
            return Ok(playerCards);
        }
    }
}

