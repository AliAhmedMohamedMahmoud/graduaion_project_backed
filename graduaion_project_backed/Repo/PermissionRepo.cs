using graduaion_project_backed.Model;
using System.Collections.Generic;
using System.Linq;

namespace graduaion_project_backed.Repo
{
    public class PermissionRepo:IPermission
    {
        private readonly Context context;

        public PermissionRepo(Context context)
        {
            this.context = context;
        }

        public List<Premssion> getAll()
        {
            return context.Premssions.ToList();
        }
    }
}
