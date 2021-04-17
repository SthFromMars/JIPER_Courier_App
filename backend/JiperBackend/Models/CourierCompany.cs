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
        public PackageType PackageType { get; set; }
        public List<Package> Packages { get; set; }
        public List<Service> Services { get; set; }

        public CourierCompany(string name, PackageType packageType, List<Package> packages, List<Service> services)
        {
            Name = name;
            PackageType = packageType;
            Packages = packages;
            Services = services;
        }

        public CourierCompany()
        {
        }
    }
}
