using graduaion_project_backed.Model;
using System.Linq;
using System.Collections.Generic;

namespace graduaion_project_backed.Repo
{
    public class PRCrepo : IPRCrepo
    {
        readonly Context db;

        public PRCrepo(Context db)
        {
            this.db = db;
        }
        public int Add(PremissionRoleController New)
        {
            db.PremissionRoleControllers.Add(New);
            return db.SaveChanges();
        }

        public string GetRoleIdByName(string Name)
        {
            var res = db.CustomRoles.FirstOrDefault(r => r.Name.Equals(Name));
            if (res != null)
                return res.Id;
            else return null;
        }


    }
}
