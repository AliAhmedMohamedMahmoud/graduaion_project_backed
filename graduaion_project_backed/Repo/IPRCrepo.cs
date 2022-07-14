using graduaion_project_backed.Model;
using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public interface IPRCrepo
    {
        int Add(PremissionRoleController New);
        string GetRoleIdByName(string Name);
        List<CustomRole> getAllRoles();
    }
}