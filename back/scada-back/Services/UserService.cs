using Microsoft.EntityFrameworkCore;
using scada_back.Context;
using scada_back.Models;
using System;
using System.Linq;
using AppContext = scada_back.Context.ScadaDbContext;


namespace scada_back.Services
{

    public interface IUserService
    {
        User? Login(string username, string password);
        bool Register(string username, string password, string roleString);
        void Logout();
    }

    public class UserService : IUserService
    {
        public static bool HasLoggedIn { get; set; }
        public static User? CurrentlyLoggedIn { get; set; }

        public ScadaDbContext Context { get; set; }

        public UserService(ScadaDbContext scadaContext) { Context = scadaContext; }

        public User? Login(string username, string password)
        {
            //using (var Context = new AppContext())
            //{
                User user = Context.Users.FirstOrDefault(p => p.Username == username && p.Password == password);
                if (user != null)
                {
                    HasLoggedIn = true;
                    CurrentlyLoggedIn = user;
                    return user;
                }
                return null;
            //}
        }
        public bool Register(string username, string password, string roleString)
        {
            User user = Context.Users.FirstOrDefault(x => x.Username == username);
            if (user != null)
            {
                return false;
            }
            Enum.TryParse(roleString, out Role role);
            User newUser = new User()
            {
                Username = username,
                Password = password,
                Role = role
            };
            //using (var context = new AppContext())
            //{
            Context.Users.Add(newUser);
            Context.SaveChanges();
            //}
            return true;
        }

        public void Logout()
        {
            HasLoggedIn = false;
            CurrentlyLoggedIn = null;
        }
    }
}
