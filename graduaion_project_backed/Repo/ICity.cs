using graduaion_project_backed.Model;
using System.Collections.Generic;
using graduaion_project_backed.Dto;
namespace graduaion_project_backed.Repo
{
    public interface ICity:ICrud<City>
    {
        City FindByNme(string name);
        bool newNameExist(int cityId,string newName);

        CitiesPaginationAndCountDTO GetAllwithPagination(int pageNumber);

        int recordsCount();
    }
}
