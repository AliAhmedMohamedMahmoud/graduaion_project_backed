using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace graduaion_project_backed.Model
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal CostPerCity { get; set; }
        public virtual List<Branches> Branches { get; set; } = new List<Branches>();

        public virtual List<Order> Order { get; set; } = new List<Order>();

    }
}
