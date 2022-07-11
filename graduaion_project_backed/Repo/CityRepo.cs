using graduaion_project_backed.Model;
using System.Collections.Generic;
using System.Linq;

namespace graduaion_project_backed.Repo
{
    public class CityRepo : ICity
    {
        private readonly Context context;

        public CityRepo( Context context )
        {
            this.context = context;
        }
        public int Add(City New)
        {
            context.Cities.Add( New );
            context.SaveChanges();
            return New.Id;
        }

        public int Delete(int id)
        {
            City city = GetById(id);
            context.Cities.Remove(city);
            return context.SaveChanges();
        }

        public int Edit(int id, City New)
        {
            City oldCity = GetById(id);
            if (oldCity != null)
            {
                oldCity.Name = New.Name;
                oldCity.CostPerCity = New.CostPerCity;
                oldCity.stateId= New.stateId;
                context.SaveChanges();
                return oldCity.Id;
            }
            return 0;
        }

        public List<City> GetAll()
        {
           return context.Cities.ToList();
        }

        public City GetById(int id)
        {
            return context.Cities.Where(c => c.Id == id).SingleOrDefault();
        }
        public bool newNameExist(int cityId, string newName)
        {
            return context.Cities.Any(city=> city.Name==newName && city.Id !=cityId);
        }

        public City FindByNme(string name)
        {
           return context.Cities.FirstOrDefault(c => c.Name==name);
        }
    }
}
