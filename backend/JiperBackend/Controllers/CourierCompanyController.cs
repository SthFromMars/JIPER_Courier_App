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
        private readonly ExceptionLogger logger;
        public CourierCompanyController(CourierCompanyService dataLoader, ExceptionLogger logger)
        {
            this.courierCompanyService = dataLoader;
            this.logger = logger;
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
            catch(InvalidOperationException ex)
            {
                logger.LogException(ex.GetType().Name);
                return NotFound();
            }
            return Ok(courierCompany);
        }
    }
}
