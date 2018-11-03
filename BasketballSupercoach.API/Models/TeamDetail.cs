namespace BasketballSupercoach.API.Models
{
    public class TeamDetail
    {
        public int Id { get; set; }
        public int teamID { get; set; }

        public int userID { get; set; }

        public string teamname { get; set; }

        public string season { get; set; }

        public int selected { get; set; }
    }
}