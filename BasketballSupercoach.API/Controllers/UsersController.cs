using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BasketballSupercoach.API.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BasketballSupercoach.API.Models;
using BasketballSupercoach.API.Dtos;

namespace BasketballSupercoach.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IBasketballSupercoachRepository _repo;

        public UsersController(IBasketballSupercoachRepository repo)
        {
            _repo = repo;
        }
        
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            return Ok(users);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUser(string username)
        {
            var user = await _repo.GetUser(username);

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSalarySet(User user)
        {
            // if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                // return Unauthorized();

            // var userFromRepo = await _repo.GetUser(userId);
            user.SalarySet = 1;
            

            // if(await _repo.SaveAll())
            //     return NoContent();

            // throw new Exception($"Updating user salary failed on save");

            var userSalaryUpdate = await _repo.UpdateUserSalarySet(user);
            return StatusCode(201);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // // PUT api/values/5
        // [HttpPut("{id}")]
        // public void Put(int id, [FromBody] string value)
        // {
        // }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
