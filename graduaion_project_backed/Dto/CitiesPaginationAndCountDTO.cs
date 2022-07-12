using graduaion_project_backed.Model;
using System.Collections.Generic;

namespace graduaion_project_backed.Dto
{
    public class CitiesPaginationAndCountDTO
    {
        public List<City> cities { get; set; }
        public int count { get; set; }
    }
}
