using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;
using JiperBackend.DAL;
using JiperBackend.Models;

namespace JiperBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class UserController : ControllerBase
    {
        private readonly DataLoader dataLoader;
        public UserController(DataLoader dataLoader)
        {
            this.dataLoader = dataLoader;
        }

        [HttpPost("register")]
        public void Add([FromBody] JObject data)
        {
            int id = data["id"].ToObject<int>();
            string email = data["email"].ToObject<string>();
            string password = data["password"].ToObject<string>();
            string firstName = data["firstName"].ToObject<string>();
            string lastName = data["lastName"].ToObject<string>();
            string phoneNumber = data["phoneNumber"].ToObject<string>();
            string city = data["city"].ToObject<string>();
            string streetAddress = data["streetAddress"].ToObject<string>();
            string zipCode = data["zipCode"].ToObject<string>();
            dataLoader.AddUser(new User(id, email, password, firstName, lastName, phoneNumber, city, streetAddress, zipCode));
        }
    }
}