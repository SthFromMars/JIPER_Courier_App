using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using JiperBackend.Services;
using JiperBackend.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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
                user = userService.GetUser(email, password) ?? throw new ArgumentNullException();
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

        [HttpGet("{id}/orders")]
        public IActionResult GetOrders(int id)
        {
            List<Order> orders;
            try
            {
                orders = userService.GetOrders(id);
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            return Ok(orders);
        }

        [HttpGet("{userId}/orders/{orderId}")]
        public IActionResult GetOrder(int userId, int orderId)
        {
            Order order;
            try
            {
                order = userService.GetOrder(userId, orderId);
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost("updateinfo")]
        public IActionResult UpdateInfo([FromBody] JObject data)
        {
            User user;
            try
            {
                int userId = data["userId"].ToObject<int>();
                user = userService.GetUser(userId) ?? throw new ArgumentNullException();
                user.Email = data["email"].ToObject<string>();
                user.Password = data["password"].ToObject<string>();
                user.FirstName = data["firstName"].ToObject<string>();
                user.LastName = data["lastName"].ToObject<string>();
                user.PhoneNumber = data["phoneNumber"].ToObject<string>();
                Address address = data["address"].ToObject<Address>();
                user.Address.City = address.City;
                user.Address.Street = address.Street;
                user.Address.HouseNr = address.HouseNr;
                user.Address.ZipCode = address.ZipCode;
                userService.SaveChanges();
            }
            catch (NullReferenceException)
            {
                return BadRequest();
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("OPTIMISTIC_LOCK_ERROR");
            }
            return Ok(user);
        }

        [HttpPost("resolveconflict")]
        public IActionResult ResolveConflict([FromBody] JObject data)
        {
            User user = null;
            bool overwrite = false;
            try
            {
                overwrite = data["overwrite"].ToObject<bool>();
                int userId = data["userId"].ToObject<int>();
                user = userService.GetUser(userId) ?? throw new ArgumentNullException();
                user.Email = data["email"].ToObject<string>();
                user.Password = data["password"].ToObject<string>();
                user.FirstName = data["firstName"].ToObject<string>();
                user.LastName = data["lastName"].ToObject<string>();
                user.PhoneNumber = data["phoneNumber"].ToObject<string>();
                Address address = data["address"].ToObject<Address>();
                user.Address.City = address.City;
                user.Address.Street = address.Street;
                user.Address.HouseNr = address.HouseNr;
                user.Address.ZipCode = address.ZipCode;
                userService.SaveChanges();
            }
            catch (NullReferenceException)
            {
                return BadRequest();
            }
            catch (ArgumentNullException)
            {
                return NotFound();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (overwrite)
                {
                    var entry = ex.Entries.Single();
                    entry.OriginalValues.SetValues(entry.GetDatabaseValues());
                    userService.SaveChanges();
                }
                else
                {
                    ex.Entries.Single().Reload();
                    userService.SaveChanges();
                }
            }
            return Ok(user);
        }
    }
}
