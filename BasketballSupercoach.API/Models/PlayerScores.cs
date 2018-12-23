namespace BasketballSupercoach.API.Models
{
    public class PlayerScores
    {
        public int Id { get; set; }

        public int PlayerId { get; set; }

        public int GameId { get; set; }

        public string GameDate { get; set; }

        public int Score { get; set; }
    }
}