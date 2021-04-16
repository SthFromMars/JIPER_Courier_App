using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
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
                string city = data["city"].ToObject<string>();
                string street = data["street"].ToObject<string>();
                string houseNr = data["houseNr"].ToObject<string>();
                string zipCode = data["zipCode"].ToObject<string>();
                Address address = new Address(city, street, houseNr, zipCode);
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