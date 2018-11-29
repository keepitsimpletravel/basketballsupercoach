namespace BasketballSupercoach.API.Models
{
    public class TeamDetail
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int PlayerId { get; set; }

        public int Position { get; set; }

        public int Captain { get; set; }

        public int SixthMan { get; set; }

        public int Emergency { get; set; }

        public int Active { get; set; }
    }
}