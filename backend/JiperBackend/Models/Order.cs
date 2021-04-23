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
        public string Status { get; set; }
        public double Price { get; set; }
        public Package Package { get; set; }
        public string SenderName { get; set; }
        public Address Sender { get; set; }
        public string RecipientName { get; set; }
        public Address Recipient { get; set; }
        public List<Service> Services { get; set; }

        public Order(double price, Package package, string senderName, Address sender, string recipientName, Address recipient, List<Service> services)
        {
            Status = "Submitted";
            Price = price;
            Package = package;
            SenderName = senderName;
            Sender = sender;
            RecipientName = recipientName;
            Recipient = recipient;
            Services = services;
        }
    }
}
