using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {

       // readonly ICrud<State> stateRepo ;
        IstateRepo stateRepo;

        //public StateController(ICrud<State> stateRepo)
        //{
        //    this.stateRepo = stateRepo;
        //} 

        public StateController(IstateRepo stateRepo)
        {
            this.stateRepo = stateRepo;
        }
        [HttpGet]
        public IActionResult getAllStates(int pageNumber)
        {
            var states = stateRepo.GetAllPageination(pageNumber);
            if(states != null)
                return Ok(states);
            return Problem(detail: "no data");
        }
        [HttpGet("Number/")]
        public IActionResult getAllStatesNUmber()
        {
            var states = stateRepo.GetAll();
            if (states != null)
                return Ok(states.Count);
            return Ok(0);
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
        public IActionResult PostState(State state)
        {
            if (ModelState.IsValid == true)
            {

                //State state = new State()
                //{
                //    Name = stateName
                //};
                int res = stateRepo.Add(state);
                string url = Url.Link("getState", new { id = state.Id });
                return Created(url, state);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateState(int id, State s)
        {

            var rowsEffected=stateRepo.Edit(id,s);
            if (rowsEffected > 0)
                return Ok();
           else
                return Problem(detail: "no data");
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteState(int id)
        {

            var rowsEffected = stateRepo.Delete(id);
            if (rowsEffected > 0)
                return Ok();
            else
                return Problem(detail: "no data");
        }
    }
}
