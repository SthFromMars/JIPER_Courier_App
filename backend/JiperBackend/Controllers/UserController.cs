using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using JiperBackend.Services;
using JiperBackend.Models;
using System.Collections.Generic;
using System.Linq;

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
        public IActionResult Add([FromBody] JObject data)
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
            catch (NullReferenceException)
            {
                return BadRequest();
            }
            userService.AddUser(user);
            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] JObject data)
        {
            User user;
            string email, password;

            try
            {
                email = data["email"].ToObject<string>();
                password = data["password"].ToObject<string>();
                user = userService.GetUser(email, password) ?? throw new ArgumentNullException(nameof(user)); ;
            }
            catch (NullReferenceException)
            {
                return BadRequest();
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            
            return Ok(user);
        }

        [HttpPost("neworder")]
        public IActionResult AddOrder([FromBody] JObject data, [FromServices] CourierCompanyService courierCompanyService)
        {
            Order order;
            Address senderAddress, recipientAddress;

            try
            {
                DateTime date = DateTime.Now;
                string paymentType = data["paymentType"].ToObject<string>();

                int userId = data["userId"].ToObject<int>();
                User sender = userService.GetUser(userId);
                string senderName = sender.FirstName + " " + sender.LastName;
                
                int packageId = data["packageId"].ToObject<int>();
                int courierCompanyId = data["courierCompanyId"].ToObject<int>();
                List<int> serviceIds = data["services"].Values<int>().ToList();

                CourierCompany company = courierCompanyService.GetCourierCompany(courierCompanyId);
                List<Service> services = company.Services.FindAll(s => serviceIds.Contains(s.Id));
                Package package = company.Packages.Find(p => p.Id == packageId);

                string recipientName = data["recipientName"].ToObject<string>();
                recipientAddress = data["recipientAddress"].ToObject<Address>();
                senderAddress = data["senderAddress"].ToObject<Address>();

                order = new Order(date, paymentType, package, senderName, senderAddress, recipientName, recipientAddress, services);
                userService.AddOrder(userId, order);
            }
            catch (NullReferenceException)
            {
                return BadRequest();
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (FormatException)
            {
                return NotFound();
            }
            return Ok(order);
        }
    }
}
