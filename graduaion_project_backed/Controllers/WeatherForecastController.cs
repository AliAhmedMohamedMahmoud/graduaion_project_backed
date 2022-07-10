using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using graduaion_project_backed.Repo;
namespace graduaion_project_backed.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IOrderRepo orderRepo;

        public WeatherForecastController(IOrderRepo orderRepo)
        {
            this.orderRepo = orderRepo;
        }

        [HttpGet]
        public IActionResult test()
        {
            var x = orderRepo.getByStatus(1, 1);
            return Ok();
        }
    }
}
