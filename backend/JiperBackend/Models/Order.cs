using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiperBackend.Models
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Package Package { get; set; }
        public Address Sender { get; set; }
        public Address Recipient { get; set; }
        public List<Service> Services { get; set; }

        public Order(Package package, Address sender, Address recipient, List<Service> services)
        {
            Package = package;
            Sender = sender;
            Recipient = recipient;
            Services = services;
        }
    }
}
