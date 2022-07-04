using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace graduaion_project_backed.Model
{
    public class State
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Order> Order { get; set; } = new List<Order>();

    }
}
