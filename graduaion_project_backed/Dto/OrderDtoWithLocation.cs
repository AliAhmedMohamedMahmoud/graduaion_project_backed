using System;

namespace graduaion_project_backed.Dto
{
    public class OrderDtoWithLocation
    {
        public int Id { get; set; }
        public string state{ get; set; }
        public string status{ get; set; }
        public string city{ get; set; }
        public int customerPhone { get; set; }
        public string userId { get; set; }
        public string customerName { get; set; }
        public int cost { get; set; }
        public DateTime Date { get; set; }
    }
}
