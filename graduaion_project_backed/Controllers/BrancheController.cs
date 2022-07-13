using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrancheController : ControllerBase
    {
        private readonly IBranchRepo BranchesRepo;

        public BrancheController(IBranchRepo _BranchesRepo)
        {
            BranchesRepo = _BranchesRepo;
        }
        [HttpGet("pagination/{pageNumber:int}")]
        public IActionResult getAll(int pageNumber)
        {
            try
            {
                return Ok(BranchesRepo.pagination(pageNumber));
            }
            catch
            {
                return Problem("something went wrong");
            }

        }
        [HttpGet]
        public IActionResult GetAllBranch()
        {
            return Ok(BranchesRepo.GetAll());
        }

        [HttpGet("{id:int}", Name = "GetOneEmpRoute")]
        public IActionResult GetBranchById(int id)
        {
            return Ok(BranchesRepo.GetById(id));
        }

        [HttpPost]
        public IActionResult PostBranchById(Branches branche)
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

        public IActionResult PutBranchById(int id, Branches branche)
        {
            if (ModelState.IsValid == true)
            {
                var returnedBranch = BranchesRepo.Edit(id, branche);
                return StatusCode(204, returnedBranch);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBranch(int id)
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
