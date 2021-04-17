using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiperBackend.Models
{
    public class CourierCompany
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Package> Packages { get; set; }
        public List<Service> Services { get; set; }

        public CourierCompany(string name, List<Package> packages, List<Service> services)
        {
            Name = name;
            Packages = packages;
            Services = services;
        }
    }
}
