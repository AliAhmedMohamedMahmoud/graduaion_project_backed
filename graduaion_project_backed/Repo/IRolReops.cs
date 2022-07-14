using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public interface IRolReops
    {
        List<RoleDTO> GetAll();
    }
}