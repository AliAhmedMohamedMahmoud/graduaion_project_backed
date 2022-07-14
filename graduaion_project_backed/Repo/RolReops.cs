using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace graduaion_project_backed.Repo
{
    public class RolReops : IRolReops
    {
        readonly Context db;
        public RolReops(Context db)
        {
            this.db = db;
        }
        public List<RoleDTO> GetAll()
        {
            List<CustomRole> RoleList = db.CustomRoles.ToList();
            List<RoleDTO> RoleDTOList = new List<RoleDTO>();
            foreach (CustomRole Role in RoleList)
            {
                RoleDTO roleDTO1 = new RoleDTO();
                roleDTO1.RoleName = Role.Name;
                RoleDTOList.Add(roleDTO1);

            }
            return RoleDTOList;
        }

    }
}
