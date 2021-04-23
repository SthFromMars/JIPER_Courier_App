using JiperBackend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace JiperBackend.Services
{
    public class UserService
    {
        public DbSet<User> users;
        public readonly Context db;

        public UserService(Context db)
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
            if (!users.Contains(user)) 
                users.Add(user);
            SaveChanges();
        }

        public User GetUser(string email, string password)
        {
            return users.Where(u => u.Email == email && u.Password == password).First();
        }
    }
}