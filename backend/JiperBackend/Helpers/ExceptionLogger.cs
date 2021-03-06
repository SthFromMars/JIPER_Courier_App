using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace JiperBackend.Helpers
{
    public class ExceptionLogger
    {
        private readonly IConfiguration configuration;

        public ExceptionLogger(IConfiguration con)
        {
            configuration = con;
        }

        public void LogException(Exception ex)
        {
            if (configuration.GetValue<bool>("Log") == false)
            {
                return;
            }
            var message = String.Format("ERROR in last call: {0}", ex.GetType().Name);
            using (StreamWriter outputFile = new StreamWriter("log.txt", true))
            {
                outputFile.WriteLine(message);
                outputFile.WriteLine(ex.StackTrace);
            }
        }
    }
}