namespace BasketballSupercoach.API.Models
{
    public class TeamDetail
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int UserID { get; set; }

        public string Teamname { get; set; }

        public string Season { get; set; }

        public int Selected { get; set; }
    }
}