using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;
using JiperBackend.Services;
using JiperBackend.Models;

namespace JiperBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class UserController : ControllerBase
    {
        private readonly UserService dataLoader;
        public UserController(UserService dataLoader)
        {
            this.dataLoader = dataLoader;
        }

        [HttpPost("register")]
        public User Add([FromBody] JObject data)
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
            User user = new User(email, password, firstName, lastName, phoneNumber, address);
            dataLoader.AddUser(user);
            return user;
        }
    }
}