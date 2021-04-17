using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiperBackend.Models
{
    public class Package
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public Package(string name, double price, double weight, int length, int width, int height)
        {
            Name = name;
            Price = Price;
            Weight = weight;
            Length = length;
            Width = width;
            Height = height;
        }

        public Package(string name, double price, double weight)
        {
            Name = name;
            Price = Price;
            Weight = weight;
        }
    }
}
