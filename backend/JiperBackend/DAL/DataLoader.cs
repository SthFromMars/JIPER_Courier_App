using JiperBackend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace JiperBackend.DAL
{
    public class DataLoader
    {
        public DbSet<User> users;
        public readonly Context db;

        public DataLoader(Context db)
        {
            this.db = db;
            users = db.Users;
        }

        public void SaveChanges()
        {
            db.SaveChanges();
        }

        public void AddUser(User user)
        {
            if (!users.Contains(user)) users.Add(user);
            SaveChanges();
        }
    }
}