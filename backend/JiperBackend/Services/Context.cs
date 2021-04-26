using JiperBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace JiperBackend.Services
{
    public class Context : DbContext
    {

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<CourierCompany> CourierCompanies { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<CourierCompany>().ToTable("CourierCompany");
            modelBuilder.Entity<Order>().ToTable("Order");
        }
    }
}