using graduaion_project_backed.Model;
using graduaion_project_backed.Dto;
namespace graduaion_project_backed.Repo
{
    public interface IstateRepo : ICrud<State>
    {
       
        PaginationGlobal<State> GetAllPageination(int pageNumber);
      
        
    }
}
