using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Dto;
using System.Threading.Tasks;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create( RoleDTO NewRole)
        {
            if (ModelState.IsValid == true)
            {
                IdentityRole role = new IdentityRole();
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
