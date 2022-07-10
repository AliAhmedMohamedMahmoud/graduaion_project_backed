using graduaion_project_backed.Dto;
using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace graduaion_project_backed.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        readonly IStatusesRepos statusRepository;
        readonly IConfiguration configuration;
        public StatusController(IStatusesRepos stuReso, IConfiguration config)
        {
            statusRepository = stuReso;
            configuration = config;


        }
        [HttpGet]
        public IActionResult GetAllStatus()
        {
            List<Status> productlist = statusRepository.GetAll();
            return Ok(productlist);
        }
        [HttpGet("{id:int}", Name = "getStatus")]
        public IActionResult GetByID(int id)
        {
            Status status = statusRepository.FindById(id);
            return Ok(status);
        }

        [HttpPost]//
        public IActionResult PostStatus(StatusDto status)
        {
            if (ModelState.IsValid == true)
            {
                
                var res = statusRepository.Insert(status);


                string url = Url.Link("getStatus", new { id = status.Id });
                return Created(url, status);
            }

            return BadRequest(ModelState);
        }
        [HttpPut("{id:int}")]
        public IActionResult Update([FromRoute] int id, [FromBody] StatusDto status)
        {
            if (ModelState.IsValid == true)
            {

                statusRepository.Edit(id, status);
                return Ok(status);


            }
            return BadRequest(ModelState);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Remove(int id)
        {
            Status status = statusRepository.FindById(id);
            if (status != null)
            {
                try
                {
                    statusRepository.Delete(id);
                    return StatusCode(204, "Record Remove Success");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest("Id Not Found");


        }
    }
}
