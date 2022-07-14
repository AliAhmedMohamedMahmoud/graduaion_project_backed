using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace graduaion_project_backed.Repo
{
    public class StatusesRepos : IStatusesRepos
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
                return raw;
            }
            catch (Exception)
            {
                return -1;
            }

        }


        public int Edit(int id, StatusDto status)
        {
            Status oldStatus = FindById(id);
            if (oldStatus != null)
            {
                oldStatus.Name = status.Name;
                db.SaveChanges();
                return oldStatus.Id;
            }
            return 0;
        }

        public List<StatusWithOrdersCountDTO> GetAllWithOrderCount()
        {
            List<Status> status = db.Statuses.Include(s=>s.Order).ToList();
            List<StatusWithOrdersCountDTO> result = new List<StatusWithOrdersCountDTO>();

            foreach (Status S1 in status)
            {
                result.Add(new StatusWithOrdersCountDTO()
                {
                    OrderCount = S1.Order.Count,
                    StatusName = S1.Name
                });
            }
            return result;


         
        }

        public List<StatusWithOrdersCountDTO> GetAllWithOrderCountForSeller(string id)
        {
            List<StatusWithOrdersCountDTO> finalRes = new List<StatusWithOrdersCountDTO>();
            finalRes =  db.Orders.Where(o=>o.UserId==id).Include(o => o.Status).GroupBy(o => o.Status.Name).Select(i => new StatusWithOrdersCountDTO()
            {
                StatusName = i.Key,
                OrderCount = i.Count()
            }).ToList();

          

            return finalRes;
        }
    }
}

                  