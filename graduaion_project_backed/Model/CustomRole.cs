using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace graduaion_project_backed.Model
{
    public class CustomRole:IdentityRole
    {
        public virtual List<PremissionRoleController> PremissionRoleControllers { get; set; }
         = new List<PremissionRoleController>();
    }
}
