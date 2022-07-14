using graduaion_project_backed.Repo;
using graduaion_project_backed.Model;
using graduaion_project_backed.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreatePermsionController : ControllerBase
    {
        readonly IPRCrepo perRepo;
        readonly RoleManager<CustomRole> roleManager;
        public GenreatePermsionController(IPRCrepo perRepo, RoleManager<CustomRole> roleManager)
        {
            this.perRepo = perRepo;
            this.roleManager = roleManager;
        }
        [HttpPost]
       public IActionResult CreatePermission (GPermissionDTO Permission )
        {


            //create role 
            var res = CreateRole(Permission.RoleName);
            if( res.Result < 0)
                return BadRequest(res);

            var roleId = perRepo.GetRoleIdByName(Permission.RoleName);
            if( roleId == null)
                return BadRequest(res);


            foreach (var record in Permission.PermissionMat)
            {
                foreach (var permissionId in record.Value)
                {
                    perRepo.Add(new PremissionRoleController()
                    {
                        controllerId = record.Key,
                       CustomRoleId = roleId,
                        Premission = permissionId
                    }); ;
                }
            }

            return Ok();
        }

        async Task<int> CreateRole(string RoleName)
        {
            CustomRole role = new CustomRole();
            role.Name = RoleName;
            IdentityResult result = await roleManager.CreateAsync(role);
            if (result.Succeeded == true)
            {
                return 1;
            }
            else
            {
                return -1;
            }
        }
    }
}
