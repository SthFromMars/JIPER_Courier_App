using JiperBackend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace JiperBackend.Services
{
    public class OrderService
    {
        public DbSet<Order> orders;
        public readonly Context db;

        public OrderService(Context db)
        {
            this.db = db;
            orders = db.Orders;
        }

        public void SaveChanges()
        {
            db.SaveChanges();
        }
    }
}