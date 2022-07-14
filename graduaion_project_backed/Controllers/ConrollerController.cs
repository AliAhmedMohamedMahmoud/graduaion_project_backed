using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Repo;
namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConrollerController : ControllerBase
    {
        private readonly IControllerRepo controllerRepo;

        public ConrollerController( IControllerRepo controllerRepo )
        {
            this.controllerRepo = controllerRepo;
        }


        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(controllerRepo.getAll());
            }
            catch
            {
                return Problem("something went wrong");
            }

        }
    }
}
