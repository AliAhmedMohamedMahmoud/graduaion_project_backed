using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Dto;
using System.Threading.Tasks;
using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<CustomRole> roleManager;

        public RoleController(RoleManager<CustomRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        
         [HttpGet]
        public IActionResult getAll()
        {
            return Ok(RolReops.)
        }
    
        [HttpPost]
        public async Task<IActionResult> Create( RoleDTO NewRole)
        {
            if (ModelState.IsValid == true)
            {
                CustomRole role = new CustomRole();
                role.Name = NewRole.RoleName;
                IdentityResult result = await roleManager.CreateAsync(role);
                if (result.Succeeded == true)
                {
                    return Ok();
                }
                else
                {
                    foreach (var item in result.Errors)
                    {
                        ModelState.AddModelError("", item.Description);
                    }
                }
            }
            return BadRequest();
        }
    }
}
