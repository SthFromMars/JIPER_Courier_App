using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JiperBackend.Models;

namespace JiperBackend.Services
{
    public class CourierCompanyService
    {
        public DbSet<CourierCompany> courierCompanies;
        public readonly Context db;

        public CourierCompanyService(Context db)
        {
            this.db = db;
            courierCompanies = db.CourierCompanies;
        }

        public void SaveChanges()
        {
            db.SaveChanges();
        }

        public CourierCompany GetCourierCompany(int id)
        {
            return courierCompanies.Include(courier => courier.Packages)
                .Include(courier => courier.Services).Where(courier => courier.Id == id).First();
        }
    }
}
