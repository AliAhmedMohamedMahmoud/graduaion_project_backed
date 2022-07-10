using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;
using h = graduaion_project_backed.Dto;
namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {

        readonly ICrud<State> stateRepo ;

        public StateController(ICrud<State> stateRepo)
        {
            this.stateRepo = stateRepo;
        } 
        
        [HttpGet]
       public IActionResult getAllStates()
        {
            var states = stateRepo.GetAll();
            if(states != null)
                return Ok(states);
            return Problem(detail: "no data");
        }

        [HttpGet("{id:int}", Name = "getState")]   
      public   IActionResult getStatesById(int id)
        {
            var state = stateRepo.GetById(id);
            if (state != null)
                return Ok(state);
            return Problem(detail: "no data");
        }
        [HttpPost]
        public IActionResult PostState([FromQuery] string  stateName)
        {
            if (ModelState.IsValid == true)
            {

                State state = new State()
                {
                    Name = stateName
                };
                int res = stateRepo.Add(state);
                string url = Url.Link("getState", new { id = state.Id });
                return Created(url, state);
            }
            return BadRequest(ModelState);
        }

        //[HttpPut("{id:int}")]
        //public IActionResult UpdateState (int id, [FromQuery] string stateName)
        //{
        //    var
        //}
    }
}
