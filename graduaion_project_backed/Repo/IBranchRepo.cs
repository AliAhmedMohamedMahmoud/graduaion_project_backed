using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;

namespace graduaion_project_backed.Repo
{
    public interface IBranchRepo:ICrud<Branches>
    {
        int recordsCount();
        PaginationGlobal<Branches> pagination(int PageNumber);
    }
}
