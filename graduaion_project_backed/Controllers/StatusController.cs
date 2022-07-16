using graduaion_project_backed.Dto;
using graduaion_project_backed.Filter;
using graduaion_project_backed.Model;
using graduaion_project_backed.Repo;
using Microsoft.AspNetCore.Authorization;
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
       // [RequestFilter("Show", "Status")]

        public IActionResult GetAllStatus()
        {
            List<Status> statuslist = statusRepository.GetAll();
            return Ok(statuslist);
        }
        [HttpGet("{id:int}", Name = "getStatus")]
       // [RequestFilter("Show", "Status")]

        public IActionResult GetByID(int id)
        {
            Status status = statusRepository.FindById(id);
            return Ok(status);
        }


        [HttpGet("SatatusOrdersPerUsers/{id}")]

        public IActionResult SatatusOrdersPerUsers(string id)
        {
            var res = statusRepository.GetAllWithOrderCountForSeller(id);
            return Ok(res);
        }


        [HttpGet("AllSatatusOrders")]
        //[Authorize(Roles = "Employee")]
        public IActionResult SatatusOrdersPerUsers()
        {
            var res = statusRepository.GetAllWithOrderCount();
            return Ok(res);
        }

        [HttpPost]
        [RequestFilter("Add", "Status")]
        public IActionResult PostStatus(StatusDto status)
        {
            try
            {
                var checkStatus= statusRepository.FindById(status.Id);

                if (checkStatus != null) return Problem("the city name is already exist");

                var addStatus = statusRepository.Insert(status);
                return Ok(addStatus);
            }
            catch
            {
                return Problem("something went wrong");
            }
        }

        [HttpPut("{id:int}")]
        [RequestFilter("Edit", "Status")]
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
        [RequestFilter("Delete", "Status")]
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
