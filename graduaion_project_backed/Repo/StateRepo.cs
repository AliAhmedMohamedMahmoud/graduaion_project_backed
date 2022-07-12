using graduaion_project_backed.Model;
using graduaion_project_backed.Dto;
using System.Collections.Generic;
using System.Linq;
namespace graduaion_project_backed.Repo
{
    public class StateRepo :IstateRepo
    {
        readonly Context db; 
        public StateRepo(Context db)
        {
            this.db = db;   
        }
        public int Add(State New)
        {         
            db.States.Add(New);
            return db.SaveChanges();
        }

        public int Delete(int id)
        {
          var state = db.States.SingleOrDefault(s=>s.Id == id);
            if( state != null)
            {
                db.States.Remove(state);
                return db.SaveChanges();
            }
            return -1; 
        }

        public int Edit(int id, State New)
        {
            var Oldstate = db.States.SingleOrDefault(s => s.Id == id);
            if (Oldstate != null)
            {
                Oldstate.Name = New.Name;
                return db.SaveChanges();
            }
            return -1;
        }

        public List<State> GetAll()
        {
            return db.States.ToList();
        }

        public PaginationGlobal<State> GetAllPageination(int pageNumber)
        {
            return new PaginationGlobal<State>()
            {
                count = db.States.Count(),
                Record = db.States.Skip(2 * (pageNumber - 1)).Take(2).ToList()
            };
               
        }

        public State GetById(int id)
        {
            return db.States.SingleOrDefault(s => s.Id == id);
        }
    }
}
