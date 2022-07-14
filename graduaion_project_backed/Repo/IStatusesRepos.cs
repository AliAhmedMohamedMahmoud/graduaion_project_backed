using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public interface IStatusesRepos
    {

        int Delete(int id);
        int Edit(int id, StatusDto status);
        Status FindById(int id);

        int Insert(StatusDto status);
        List<Status> GetAll();

        List<StatusWithOrdersCountDTO> GetAllWithOrderCount();
        List<StatusWithOrdersCountDTO> GetAllWithOrderCountForSeller(string id);
    }
}

