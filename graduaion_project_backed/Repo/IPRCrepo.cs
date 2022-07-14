using graduaion_project_backed.Model;

namespace graduaion_project_backed.Repo
{
    public interface IPRCrepo
    {
        int Add(PremissionRoleController New);
        string GetRoleIdByName(string Name);
    }
}