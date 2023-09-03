using Microsoft.AspNetCore.Mvc;
using scada_back.DTO;
using scada_back.Models;
using scada_back.Services;
using System;

namespace scada_back.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        public IUserService _userService { get; set; }

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("slay")]
        public async Task<ActionResult<bool>> Slay()
        {
            try { 
                bool result = true;
                return Ok(result);
            }
            catch (Exception exception)
            {
                return Ok(exception.Message);
            }
        }

        [HttpPost]
        [Route("slayPost")]
        public async Task<ActionResult<bool>> SlayPost([FromBody] NewUserDTO newUserDTO)
        {
            try
            {
                Console.WriteLine(newUserDTO.ToString);
                return Ok();
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<bool>> Login([FromBody] NewUserDTO newUserDTO)
        {
            try
            {
                Console.WriteLine(newUserDTO);
                User u = _userService.Login(newUserDTO.Username, newUserDTO.Password);
                if (u == null)
                {
                    return BadRequest(new { message = "Incorrect username or password" });
                }
                else
                {
                    return Ok(new { message = "Successfully logged in" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<bool>> Register([FromBody] NewUserDTO newUserDTO)
        {
            try
            {
                bool successful = _userService.Register(newUserDTO.Username, newUserDTO.Password, "USER");
                if (successful)
                {
                    return Ok(new { message = "Successfully registered new user " + newUserDTO.Username });
                }
                else
                {
                    return BadRequest(new { message = "Username taken. Try another" });
                }
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpPut]
        [Route("logout")]
        public async Task<ActionResult<bool>> Logout()
        {
            try
            {
                _userService.Logout();
                return Ok(new { message = "Successfully logged out" });
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }



    }
}
