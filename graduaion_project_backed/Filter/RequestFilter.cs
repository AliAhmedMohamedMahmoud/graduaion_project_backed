using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace graduaion_project_backed.Filter
{
    public class RequestFilter  : Attribute, IActionFilter 
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            throw new System.NotImplementedException();
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}
