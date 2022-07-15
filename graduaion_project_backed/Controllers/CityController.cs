using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Repo;
using graduaion_project_backed.Model;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICity cityRepo;
        public CityController( ICity cityRepo )
        {
            this.cityRepo = cityRepo;
        }


        [HttpGet("pagination/{pageNumber:int}")]
        public IActionResult getAll(int pageNumber)
        {
            try
            {
                return Ok(cityRepo.GetAllwithPagination(pageNumber));
            }
            catch
            {
                return Problem("something went wrong");
            }

        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(cityRepo.GetAll());
            }
            catch
            {
                return Problem("something went wrong");
            }

        }

        [HttpGet("{id:int}")]
        public IActionResult getcity(int id)
        {
            try
            {
                City city = cityRepo.GetById(id);
                if (city == null)
                {
                    return Problem("the id doesn't exist");
                }
                return Ok(city);
            }
            catch
            {
                return Problem("something went wrong");
            }
        }

        [HttpPost]
        public IActionResult addcity(City city)
        {
            try
            {
                var checkCity = cityRepo.FindByNme(city.Name);
                
                if (checkCity != null) return Problem("the city name is already exist") ;
                
                var addCity= cityRepo.Add(city);
                return Ok(addCity);
            }
            catch
            {
                return Problem("something went wrong");
            }
        }

        [HttpPut("{id:int}")]
        public IActionResult editcity(int id, City city)
        {

            try
            {
                var cityNmeExists = cityRepo.newNameExist(id,city.Name);

                if (cityNmeExists) return Problem("the city name is already exist");
            
                var editCity = cityRepo.Edit(id, city);
                return Ok(editCity);
            }
            catch
            {
                return Problem("something went wrong");
            }
        }


        [HttpDelete("{id:int}")]
        public IActionResult deletecity(int id)
        {
            try
            {
                if (cityRepo.GetById(id) == null)
                {
                    return Problem("the id doesn't exist");
                }
                return Ok(cityRepo.Delete(id));
            }
            catch
            {
                return Problem("something went wrong");
            }
        }

    }
}
