namespace BasketballSupercoach.API.Models
{
    public class Round
    {
        public int Id { get; set; }

        public int RoundNumber { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }
    }
}