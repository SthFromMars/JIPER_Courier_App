using JiperBackend.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.IO;

namespace JiperBackend.Helpers
{
    public class LogActionFilter : ActionFilterAttribute

    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            int userId = -1;
            if(filterContext.HttpContext.Items["User"] != null)
            {
                userId = ((User)filterContext.HttpContext.Items["User"]).Id;
            }
            
            string requestmethod = filterContext.HttpContext.Request.Method;
            
            string request = requestmethod + " " + filterContext.HttpContext.Request.Path.Value;

            Log(userId, request);
        }

        private void Log(int userid, string request)
        {
            var message = String.Format("{0} user:{1}  {2}", DateTime.Now, userid, request);
            using (StreamWriter outputFile = new StreamWriter("log.txt", true))
            {
                outputFile.WriteLine(message);
            }
        }

    }
}