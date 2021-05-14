using JiperBackend.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using JiperBackend.Helpers;
using Microsoft.Extensions.Options;

namespace JiperBackend.Services
{
    public class UserService
    {
        public DbSet<User> users;
        public readonly Context db;
        private readonly AppSettings _appSettings;

        public UserService(Context db, IOptions<AppSettings> appSettings)
        {
            this.db = db;
            users = db.Users;
            _appSettings = appSettings.Value;
        }

        public void SaveChanges()
        {
            db.SaveChanges();
        }

        public AuthenticateResponse AddUser(User user)
        {
            if (!users.Contains(user))
            {
                users.Add(user);
            }
            SaveChanges();

            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public AuthenticateResponse Authenticate(string email, string password)
        {
            var user = users.Where(u => u.Email == email && u.Password == password)
                .Include(u => u.Address)
                .FirstOrDefault() ?? throw new ArgumentNullException();
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public User GetUser(int id)
        {
            return users.Include(u => u.Address).Include(u => u.Orders).Where(u => u.Id == id).FirstOrDefault();
        }

        public void AddOrder(int userId, Order order)
        {
            User user = GetUser(userId);

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

        public List<Order> GetOrders(int id)
        {
            User user = GetUser(id);

            if (user == null)
            {
                throw new ArgumentNullException();
            }
            return users
                .Include(u => u.Orders)
                .Where(u => u.Id == id)
                .SelectMany(u => u.Orders)
                    .Include(o => o.Package)
                    .Include(o => o.Recipient)
                    .Include(o => o.Sender)
                    .Include(o => o.Services)
                    .ToList();
        }

        public Order GetOrder(int userId, int orderId)
        {
            User user = GetUser(userId);

            if(user == null)
            {
                throw new ArgumentNullException();
            }
            return user.Orders.Where(order => order.Id == orderId).First();
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}