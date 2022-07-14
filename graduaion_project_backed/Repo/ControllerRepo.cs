using graduaion_project_backed.Model;
using System.Collections.Generic;
using System.Linq;
namespace graduaion_project_backed.Repo
{
    public class ControllerRepo : IControllerRepo
    {
        private readonly Context context;

        public ControllerRepo(Context context)
        {
            this.context = context;
        }

        public List<controllers> getAll()
        {
            return context.Controllers.ToList();
        }
    }
}
