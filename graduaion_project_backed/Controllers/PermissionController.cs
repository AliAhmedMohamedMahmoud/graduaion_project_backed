using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Repo;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermission permission;

        public PermissionController(IPermission permission)
        {
            this.permission = permission;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(permission.getAll());
            }
            catch
            {
                return Problem("something went wrong");
            }

        }
    }
}
