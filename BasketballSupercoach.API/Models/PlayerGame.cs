namespace BasketballSupercoach.API.Models
{
    public class PlayerGame
    {
        public int Id { get; set; }

        public int GameId { get; set; }

        public int PlayerId { get; set; }

        public string GameDate { get; set; }

        public int ThreesMade { get; set; }

        public int OffRebounds { get; set; }

        public int DefRebounds { get; set; }

        public int Assists { get; set; }

        public int Turnovers { get; set; }

        public int Steals { get; set; }

        public int Blocks { get; set; }

        public int Minutes { get; set; }

        public int Points { get; set; }
    }
}