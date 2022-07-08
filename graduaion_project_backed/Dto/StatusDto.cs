using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace graduaion_project_backed.Dto
{
    public class StatusDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        [JsonIgnore]
        public List<string> orders { get; set; } = new List<string>();

    }
}
