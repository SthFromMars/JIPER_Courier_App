﻿using JiperBackend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

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
            return users.Where(u => u.Email == email && u.Password == password).FirstOrDefault();
        }

        public User GetUser(int id)
        {
            return users.Where(u => u.Id == id).FirstOrDefault();
        }

        public void AddOrder(int userId, Order order)
        {
            User user = users.Where(u => u.Id == userId).FirstOrDefault();

            if (user != null)
            {
                if (user.Orders == null)
                {
                    user.Orders = new List<Order>();
                }
                user.Orders.Add(order);
            }
            SaveChanges();
        }
    }
}