using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json.Linq;
using System;
using System.Diagnostics;
using System.IO;

namespace JiperBackend
{
    public class LogActionFilter : ActionFilterAttribute

    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            int userId;
            string requestmethod = filterContext.HttpContext.Request.Method;
            if (requestmethod == "POST")
            {
                JObject data = (JObject)filterContext.ActionArguments["data"];
                userId = data["userId"].ToObject<int>();
            }
            else
            {
                userId = (int)filterContext.ActionArguments["userId"];
            }
            string request = requestmethod + " " + filterContext.HttpContext.Request.Path.Value;

            Log(userId, request);
        }

        private void Log(int userid, string request)
        {
            var message = String.Format("{0} userId:{1}  {2}", DateTime.Now, userid, request);
            using (StreamWriter outputFile = new StreamWriter("log.txt", true))
            {
                outputFile.WriteLine(message);
            }
        }

    }
}