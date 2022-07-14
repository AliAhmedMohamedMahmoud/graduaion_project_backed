using System.Collections.Generic;

namespace graduaion_project_backed.Dto
{
    public class GPermissionDTO
    {
        public Dictionary<int,List<int>> PermissionMat { get; set; } = new Dictionary<int,List<int>>();
        public string RoleName { get; set; }
    }
}
