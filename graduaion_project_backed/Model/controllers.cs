using System.Collections.Generic;

namespace graduaion_project_backed.Model
{
    public class controllers
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<PremissionRoleController> PremissionRoleControllers { get; set; }
            =new List<PremissionRoleController>();
    }
}
