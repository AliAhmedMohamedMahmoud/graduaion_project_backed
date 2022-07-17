using graduaion_project_backed.Model;
using System.Collections.Generic;

namespace graduaion_project_backed.Dto
{
    public class stateWithCities
    {
        public int statteId { get; set; }
        public string stateName { get; set; }
        public List<City> cities { get; set; }
    }
}
