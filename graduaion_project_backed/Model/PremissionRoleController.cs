using System.ComponentModel.DataAnnotations.Schema;

namespace graduaion_project_backed.Model
{
    public class PremissionRoleController
    {
        public int Id { get; set; }
        [ForeignKey("controllers")]
        public int controllerId { get; set; }
        public controllers controllers { get; set; }
        [ForeignKey("premssion")]
        public int Premission{ get; set; }
        public Premssion premssion { get; set; }
        [ForeignKey("customRole")]
        public string CustomRoleId { get; set; }
        public CustomRole customRole { get; set; }
    }
}
