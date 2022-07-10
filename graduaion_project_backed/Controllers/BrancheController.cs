using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrancheController : ControllerBase
    {
        private readonly ICrud<Branches> BranchesRepo;

        public BrancheController(ICrud<Branches> _BranchesRepo)
        {
            BranchesRepo = _BranchesRepo;
        }

        [HttpGet]
        public IActionResult GetAllEmployee()
        {
            return Ok(BranchesRepo.GetAll());
        }

        [HttpGet("{id:int}", Name = "GetOneEmpRoute")]
        public IActionResult GetEmployeeById(int id)
        {
            return Ok(BranchesRepo.GetById(id));
        }

        [HttpPost]
        public IActionResult PostEmployeeById(Branches branche)
        {
            try
            {
                BranchesRepo.Add(branche);
                string url = Url.Link("GetOneEmpRoute", new { id = branche.Id });
                return Created(url, branche);
            }
            catch
            {
                return BadRequest("Id Not Found");
            }
        }
        [HttpPut("{id}")]

        public IActionResult PutEmployeeById(int id, Branches branche)
        {
            if (ModelState.IsValid == true)
            {
                var returnedEmployee = BranchesRepo.Edit(id, branche);
                return StatusCode(204, returnedEmployee);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                BranchesRepo.Delete(id);
                return StatusCode(204, "Record Remove Success");
            }
            catch
            {
                return BadRequest("Id Not Found");
            }
        }
       
    
}
}
