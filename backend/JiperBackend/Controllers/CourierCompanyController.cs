using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JiperBackend.Services;
using JiperBackend.Models;

namespace JiperBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourierCompanyController : ControllerBase
    {
        private readonly CourierCompanyService courierCompanyService;
        public CourierCompanyController(CourierCompanyService dataLoader)
        {
            this.courierCompanyService = dataLoader;
        }

        [HttpGet("courier/{name}")]
        public IActionResult GetCourierCompany(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return BadRequest();
            CourierCompany courierCompany;
            try
            {
                courierCompany = courierCompanyService.GetCourierCompany(name);
            }
            catch(InvalidOperationException)
            { 
                return BadRequest();
            }
            return Ok(courierCompany);
        }
    }
}
