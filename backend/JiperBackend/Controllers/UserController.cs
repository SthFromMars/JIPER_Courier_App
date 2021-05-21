using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using JiperBackend.Services;
using JiperBackend.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using JiperBackend.Strategy;
using Microsoft.Extensions.Configuration;
using JiperBackend.Helpers;

namespace JiperBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;
        private readonly IConfiguration configuration;
        private readonly ExceptionLogger logger;

        public UserController(UserService dataLoader, IConfiguration configuration, ExceptionLogger logger)
        {
            this.userService = dataLoader;
            this.configuration = configuration;
            this.logger = logger;
        }

        [HttpPost("register")]
        public IActionResult Add([FromBody] JObject data)
        {
            AuthenticateResponse response;
            try
            {
                string email = data["email"].ToObject<string>();
                string password = data["password"].ToObject<string>();
                string firstName = data["firstName"].ToObject<string>();
                string lastName = data["lastName"].ToObject<string>();
                string phoneNumber = data["phoneNumber"].ToObject<string>();
                Address address = data["address"].ToObject<Address>();
                User user = new User(email, password, firstName, lastName, phoneNumber, address);
                response = userService.AddUser(user);
            }
            catch (NullReferenceException ex)
            {
                logger.LogException(ex.GetType().Name);
                return BadRequest();
            }
            return Ok(response);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] JObject data)
        {
            AuthenticateResponse response;
            try
            {
                string email = data["email"].ToObject<string>();
                string password = data["password"].ToObject<string>();
                response = userService.Authenticate(email, password);
            }
            catch (NullReferenceException ex)
            {
                logger.LogException(ex.GetType().Name);
                return BadRequest();
            }
            catch (ArgumentNullException ex)
            {
                logger.LogException(ex.GetType().Name);
                return NotFound();
            }
            
            return Ok(response);
        }

        [Authorize]
        [HttpPost("neworder")]
        public IActionResult AddOrder([FromBody] JObject data, [FromServices] CourierCompanyService courierCompanyService)
        {
            Order order;
            Address senderAddress, recipientAddress;

            try
            {
                DateTime date = DateTime.Now;
                string paymentType = data["paymentType"].ToObject<string>();

                int userId = ((User)HttpContext.Items["User"]).Id;
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

                Type vatType = Type.GetType("JiperBackend.Strategy." + configuration.GetValue<string>("VATCalculator"));
                order = new Order(date, paymentType, package, senderName, senderAddress, recipientName, recipientAddress, services, (IPriceCalculator) Activator.CreateInstance(vatType));
                
                userService.AddOrder(userId, order);
            }
            catch (NullReferenceException ex)
            {
                logger.LogException(ex.GetType().Name);
                return BadRequest();
            }
            catch (ArgumentNullException ex)
            {
                logger.LogException(ex.GetType().Name);
                return NotFound();
            }
            catch (FormatException ex)
            {
                logger.LogException(ex.GetType().Name);
                return NotFound();
            }
            return Ok(order);
        }

        [Authorize]
        [HttpGet("orders")]
        public IActionResult GetOrders()
        {
            List<Order> orders;
            try
            {
                int userId = ((User)HttpContext.Items["User"]).Id;
                orders = userService.GetOrders(userId).OrderByDescending(o => o.Date).ToList();
            }
            catch (ArgumentNullException ex)
            {
                logger.LogException(ex.GetType().Name);
                return NotFound();
            }
            return Ok(orders);
        }

        [Authorize]
        [HttpGet("orders/{orderId}")]
        public IActionResult GetOrder(int orderId)
        {
            Order order = null;
            try
            {
                int userId = ((User)HttpContext.Items["User"]).Id;
                order = userService.GetOrder(userId, orderId);
            }
            catch (Exception ex) {
                if (ex is ArgumentNullException || ex is InvalidOperationException)
                {
                    logger.LogException(ex.GetType().Name);
                    return NotFound();
                }
            }
            return Ok(order);
        }

        [Authorize]
        [HttpPost("updateinfo")]
        public IActionResult UpdateInfo([FromBody] JObject data)
        {
            User user;
            try
            {
                int userId = ((User)HttpContext.Items["User"]).Id;
                user = userService.GetUser(userId) ?? throw new ArgumentNullException();

                uint userVersion = data["xmin"].ToObject<uint>();
                uint addressVersion = data["address"]["xmin"].ToObject<uint>();
                bool overwrite = false;
                if (data.ContainsKey("overwrite"))
                {
                    overwrite = data["overwrite"].ToObject<bool>();
                }
                if ((userVersion != user.xmin || addressVersion != user.Address.xmin) && overwrite == false)
                {
                    return Conflict("OPTIMISTIC_LOCK_ERROR");
                }

                if (data.ContainsKey("password")) // Password may not be sent if it is not being changed
                {
                    user.Password = data["password"].ToObject<string>();
                }

                user.Email = data["email"].ToObject<string>();
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
            catch (NullReferenceException ex)
            {
                logger.LogException(ex.GetType().Name);
                return BadRequest();
            }
            catch (ArgumentNullException ex)
            {
                logger.LogException(ex.GetType().Name);
                return NotFound();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                logger.LogException(ex.GetType().Name);
                return Conflict("OPTIMISTIC_LOCK_ERROR");
            }
            return Ok(user);
        }

        [HttpGet("userinfo")]
        public IActionResult GetInfo()
        {
            User user;
            try
            {
                int userId = ((User)HttpContext.Items["User"]).Id;
                user = userService.GetUser(userId) ?? throw new ArgumentNullException();
            }
            catch (NullReferenceException ex)
            {
                logger.LogException(ex.GetType().Name);
                return BadRequest();
            }
            catch (ArgumentNullException ex)
            {
                logger.LogException(ex.GetType().Name);
                return NotFound();
            }
            return Ok(user);
        }
    }
}
