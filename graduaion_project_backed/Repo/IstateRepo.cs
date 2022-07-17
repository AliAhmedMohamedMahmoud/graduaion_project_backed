using graduaion_project_backed.Model;
using graduaion_project_backed.Dto;
using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public interface IstateRepo : ICrud<State>
    {
        PaginationGlobal<State> GetAllPageination(int pageNumber);
        List<stateWithCities> GetStateWithCities();
    }
}
