using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace graduaion_project_backed.Repo
{
    public class StatusesRepos:IStatusesRepos
    {
        Context db;
        public StatusesRepos(Context db)
        {
            this.db = db;
        }
        public List<Status> GetAll()
        {
            return db.Statuses.ToList();
        }
        public Status FindById(int id)
        {
            return db.Statuses.FirstOrDefault(x => x.Id == id);
        }
        public int Delete(int id)
        {
            Status stu = FindById(id);
            db.Statuses.Remove(stu);
            return db.SaveChanges();
        }
            public int Insert(StatusDto status)
            {
                Status stu = new Status()
                {
                   
                    Name = status.Name,

                };
                try
                {

                    db.Statuses.Add(stu);
                    int raw = db.SaveChanges();
                    return stu.Id;
                }
                catch (Exception ex)
                {

                    return -1;
                }

            }
        public int Edit(int id, StatusDto status)
        {
            Status stu = FindById(id);

            if (stu != null)
            {
                
                stu.Name = status.Name;
                
                int raw = db.SaveChanges();
                return raw;
            }
            return 0;
        }


    }
}
