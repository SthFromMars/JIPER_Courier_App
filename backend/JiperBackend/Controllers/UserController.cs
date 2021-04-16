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
        public User Add([FromBody] JObject data)
        {
            string email = data["email"].ToObject<string>();
            string password = data["password"].ToObject<string>();
            string firstName = data["firstName"].ToObject<string>();
            string lastName = data["lastName"].ToObject<string>();
            string phoneNumber = data["phoneNumber"].ToObject<string>();
            Address address = data["address"].ToObject<Address>();
            User user = new User(email, password, firstName, lastName, phoneNumber, address);
            userService.AddUser(user);
            return user;
        }
    }
}