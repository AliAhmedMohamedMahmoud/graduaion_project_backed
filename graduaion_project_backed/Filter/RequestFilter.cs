﻿using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using graduaion_project_backed.Model;
using System.Threading.Tasks;

namespace graduaion_project_backed.Filter
{
    public class RequestFilter  :Attribute, IAsyncActionFilter
    {
        string Permission;
        string Controller;
        Context Context;
        public RequestFilter(string action, string controller )
        {
            Permission = action;
            Controller = controller;
            Context= new Context();
        }


        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var token = getToken(context);
            var role = GetRole(token);

            var requestIsAuthorized = Context.PremissionRoleControllers.
                Any(r => r.controllers.Name == Controller && r.premssion.Name == Permission && r.customRole.Name == role);

            if (requestIsAuthorized)
            {
                await next();
            }

            context.HttpContext.Response.StatusCode = 401;
        }


        string getToken(ActionExecutingContext context)
        {
            return context.HttpContext.Request.Headers["Authorization"][0].Split(" ")[1];
        }


        string GetRole(string token)
        {
            string secret = "StrONGKAutHENTICATIONKEy";
            var key = Encoding.ASCII.GetBytes(secret);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            var role = handler.ValidateToken(token, validations, out var tokenSecure).Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ElementAt(0);
            return role;
        }

        

    }
}
