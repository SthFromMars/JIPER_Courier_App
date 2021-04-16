using System;

namespace JiperBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string StreetAddress { get; set; }
        public string ZipCode { get; set; }

        public User(int id, string email, string password, string firstName, string lastName, string phoneNumber, string city, string streetAddress, string zipCode)
        {
            Id = id;
            Email = email;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            City = city;
            StreetAddress = streetAddress;
            ZipCode = zipCode;
        }
    }
}
