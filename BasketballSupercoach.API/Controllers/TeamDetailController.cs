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

        [HttpPut("updateteamdetail")]
        public async Task<IActionResult> UpdateTeamDetailRecord(PlayerCardDto playerDto)
        {
            // Need to get the correct Id for the current cardPosition for the User
            var existingTeamDetailForPosition = _repo.GetTeamDetailForPosition(playerDto.userId , playerDto.CardPosition);

            if(existingTeamDetailForPosition != null) {
                // This needs to be updated
                var teamDetailToUpdate = new TeamDetail
                {
                    Active = 1,
                    Captain = playerDto.isCaptain,
                    Emergency = playerDto.isEmergency,
                    Id = existingTeamDetailForPosition.Id,
                    PlayerId = playerDto.PlayerId,
                    Position = playerDto.CardPosition,
                    SixthMan = playerDto.isSixthMan,
                    UserId = playerDto.userId
                };

                // Now need to call the update method of the TeamDetail
                var updateSalary = await _repo.UpdateTeamDetail(teamDetailToUpdate);
                return StatusCode(201);
            } else {
                // This is a new Team Detail record - realistically it should never get here
                var teamDetailToCreate = new TeamDetail
                {
                    Captain = playerDto.isCaptain,
                    Emergency = playerDto.isEmergency,
                    SixthMan = playerDto.isSixthMan,
                    Active = 1,
                    PlayerId = playerDto.PlayerId,
                    Position = playerDto.CardPosition,
                    UserId = playerDto.userId
                };
                var createdTeamDetail = await _repo.CreateTeamDetailRecord(teamDetailToCreate);
                return StatusCode(201);
            }
        }

        [HttpPut("updatesubteamdetail")]
        public async Task<IActionResult> UpdateSubTeamDetailRecord(PlayerCardDto[] playerDtos)
        {
            // // Need to update both all of the records
            // foreach(var playerDto in playerDtos) {
            //     // Need to get the correct Id for the current cardPosition for the User
            //     var existingTeamDetailForPosition = _repo.GetTeamDetailForPosition(playerDto.userId , playerDto.CardPosition);

            //     // System.out
            //     if(existingTeamDetailForPosition != null) {
            //         // This needs to be updated
            //         var teamDetailToUpdate = new TeamDetail
            //         {
            //             Active = 1,
            //             Captain = playerDto.isCaptain,
            //             Emergency = playerDto.isEmergency,
            //             Id = existingTeamDetailForPosition.Id,
            //             PlayerId = playerDto.PlayerId,
            //             Position = playerDto.CardPosition,
            //             SixthMan = playerDto.isSixthMan,
            //             UserId = playerDto.userId
            //         };

            //         // Now need to call the update method of the TeamDetail
            //         var teamDetail = await _repo.UpdateTeamDetail(teamDetailToUpdate);
            //     }
            // }
            // return StatusCode(201);
            // console.log(log data here) 
            // cons
            System.Diagnostics.Trace.WriteLine("Entering the Update Team Detail");
            foreach(var playerDto in playerDtos) {
            //     // TeamDetail td = _con
                System.Diagnostics.Trace.WriteLine("Entering the Update Team Detail + player: " + playerDto.PlayerId + " and pos: " + playerDto.CardPosition + " for user: " + playerDto.userId);
                var teamDetail = await _repo.UpdateTeamDetail(playerDto);
            }

            return StatusCode(201);
        }
    }
}

