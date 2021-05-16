using System.ComponentModel.DataAnnotations.Schema;

namespace JiperBackend.Models
{
    public class Address
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNr { get; set; }
        public string ZipCode { get; set; }
        public uint xmin { get; }

        public Address(string city, string street, string houseNr, string zipCode)
        {
            City = city;
            Street = street;
            HouseNr = houseNr;
            ZipCode = zipCode;
        }
    }
}