using System;
using Microsoft.AspNetCore.Mvc;
using JiperBackend.Services;
using JiperBackend.Models;
using JiperBackend.Helpers;

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

        [Authorize]
        [HttpGet("courier/{id}")]
        public IActionResult GetCourierCompany(int id)
        {
            CourierCompany courierCompany;
            try
            {
                courierCompany = courierCompanyService.GetCourierCompany(id);
            }
            catch(InvalidOperationException)
            { 
                return NotFound();
            }
            return Ok(courierCompany);
        }
    }
}
