using System;

namespace JiperBackend.Models
{
    public class Address
    {
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNr { get; set; }
        public string ZipCode { get; set; }

        public Address(string city, string street, string houseNr, string zipCode)
        {
            City = city;
            Street = street;
            HouseNr = houseNr;
            ZipCode = zipCode;
        }
    }
}