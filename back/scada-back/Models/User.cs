using System.ComponentModel.DataAnnotations.Schema;

namespace scada_back.Models
{
    public enum Role
    {
        USER, ADMIN
    }

    [Table("Users")]
    public class User
    {
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("username")]
        public string Username { get; set; }

        [Column("password")]
        public string Password { get; set; }

        [Column("role")]
        public Role Role { get; set; }

        //public User(string username, string password, Role role)
        //{
        //    Username = username;
        //    Password = password;
        //    Role = role;
        //}
    }
}
