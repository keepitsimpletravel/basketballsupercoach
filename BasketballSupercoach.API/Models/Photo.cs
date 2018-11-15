namespace BasketballSupercoach.API.Models
{
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public System.DateTime DateAdded { get; set; }

        public User User { get; set; }

        public int UserID { get; set; }
    }
}