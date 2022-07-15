using System;

namespace graduaion_project_backed.Dto
{
    public class OrderDTO
    {
        public  int cityId { get; set; }
        public  int stateId { get; set; }
        public  int statusId { get; set; }
        public int customerPhone { get; set; }
        public  string userId { get; set; }
        public  string customerName { get; set; } 
        public int cost { get; set; }
        public DateTime Date { get; set; }

    }
}
