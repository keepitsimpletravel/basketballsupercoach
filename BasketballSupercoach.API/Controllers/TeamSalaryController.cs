using System.Threading.Tasks;
using BasketballSupercoach.API.Data;
using BasketballSupercoach.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using BasketballSupercoach.API.Models;

namespace BasketballSupercoach.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamSalaryController : ControllerBase
    {
        private readonly IBasketballSupercoachRepository _repo;

        // private readonly IConfiguration _config;
        public TeamSalaryController(IBasketballSupercoachRepository repo)
        {
            _repo = repo;
            // _config = config;
        }

        // public IConfiguration Config { get; }

    //    [HttpPost("createsalary")]
    //     public async Task<IActionResult> CreateTeamSalary(TeamSalaryCreationDto teamSalaryDto)
    //     {
    //         var teamSalaryToCreate = new TeamSalary
    //         {
    //             AvailableSalary = teamSalaryDto.AvailableSalary,
    //             UserId = teamSalaryDto.UserId
    //         };


    //         var createdSalary = await _repo.CreateTeamSalary(teamSalaryToCreate);
    //         return StatusCode(201);
    //     }

    [HttpPost("createsalary")]
        public async Task<IActionResult> CreateTeamSalary(TeamSalaryCreationDto teamSalaryDto)
        {
            var teamSalaryToCreate = new TeamSalary
            {
                AvailableSalary = teamSalaryDto.AvailableSalary,
                UserId = teamSalaryDto.UserId
            };


            var createdSalary = await _repo.CreateTeamSalary(teamSalaryToCreate);
            return StatusCode(201);
        }
    }
}