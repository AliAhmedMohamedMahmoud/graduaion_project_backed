using graduaion_project_backed.Model;

namespace graduaion_project_backed.Repo
{
    public interface ICity:ICrud<City>
    {
        City FindByNme(string name);
        bool newNameExist(int cityId,string newName);
    }
}
