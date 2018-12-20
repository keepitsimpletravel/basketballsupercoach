namespace BasketballSupercoach.API.Dtos
{
    public class ScoringSystemDto
    {
        public int Id { get; set; }

        public int Points { get; set; }

        public decimal ORebounds { get; set; }

        public decimal DRebounds { get; set; }

        public decimal Assists { get; set; }

        public int Steals { get; set; }

        public int Blocks { get; set; }

        public int DoubleDouble { get; set; }

        public int TripleDouble { get; set; }

        public int QuadDouble { get; set; }

        public decimal Minutes { get; set; }

        public int Turnovers { get; set; }

        public decimal MadeThrees { get; set; }
    }
}