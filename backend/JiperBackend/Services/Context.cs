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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User").UseXminAsConcurrencyToken();
            modelBuilder.Entity<Address>().ToTable("Address").UseXminAsConcurrencyToken();
            modelBuilder.Entity<CourierCompany>().ToTable("CourierCompany");
        }
    }
}