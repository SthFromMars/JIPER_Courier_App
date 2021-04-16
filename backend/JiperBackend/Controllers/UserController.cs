using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using JiperBackend.Services;
using JiperBackend.Models;

namespace JiperBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;
        public UserController(UserService dataLoader)
        {
            this.userService = dataLoader;
        }

        [HttpPost("register")]
        public ActionResult Add([FromBody] JObject data)
        {
            User user;
            try
            {
                string email = data["email"].ToObject<string>();
                string password = data["password"].ToObject<string>();
                string firstName = data["firstName"].ToObject<string>();
                string lastName = data["lastName"].ToObject<string>();
                string phoneNumber = data["phoneNumber"].ToObject<string>();
                Address address = data["address"].ToObject<Address>();
                user = new User(email, password, firstName, lastName, phoneNumber, address);
            }
            catch (NullReferenceException e)
            {
                return BadRequest();
            }
            userService.AddUser(user);
            return Ok(user);
        }
    }
}