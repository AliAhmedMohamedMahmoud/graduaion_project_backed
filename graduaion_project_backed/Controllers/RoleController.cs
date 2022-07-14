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
        private  IRolReops rolReops1;


        public RoleController(RoleManager<CustomRole> roleManager,IRolReops rolReops1)
        {
            this.roleManager = roleManager;
            this.rolReops1 = rolReops1;
        }

        
         [HttpGet]
        public IActionResult getAll()
        {
            return Ok(rolReops1.GetAll());
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
