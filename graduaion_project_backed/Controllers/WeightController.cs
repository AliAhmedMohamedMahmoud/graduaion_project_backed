using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;


namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightController : ControllerBase
    {

        private readonly IWeightRepo weightRepo;

        public WeightController(IWeightRepo weightRepo)
        {
            this.weightRepo = weightRepo;
        }

        [HttpGet]
        // [RequestFilter("Show", "Branch")]
        public IActionResult GetWeight()
        {
            return Ok(weightRepo.GetWeightSetting());
        }
        [HttpPut]

        public IActionResult EditWeightSetting(WeightSetting setting)
        {
            weightRepo.EditSetting(setting);
            return Ok();
        }
    }
    }
