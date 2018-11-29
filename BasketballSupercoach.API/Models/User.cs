using System.Collections.Generic;

namespace BasketballSupercoach.API.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public string Teamname { get; set; }

        public int TeamSelected { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public int Active { get; set; }
    }
}