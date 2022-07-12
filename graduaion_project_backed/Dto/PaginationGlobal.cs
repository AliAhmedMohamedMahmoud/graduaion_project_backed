using System.Collections.Generic;

namespace graduaion_project_backed.Dto
{
    public class PaginationGlobal<T>
    {
        public List<T> Record { get; set; }
        public int count { get; set; }
    }
}
