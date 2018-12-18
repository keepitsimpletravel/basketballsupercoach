namespace BasketballSupercoach.API.Dtos
{
    public class ScoringSystemDto
    {
        public int Id { get; set; }

        public int Points { get; set; }

        public int ORebounds { get; set; }

        public int DRebounds { get; set; }

        public int Assists { get; set; }

        public int Steals { get; set; }

        public int Blocks { get; set; }

        public int DoubleDouble { get; set; }

        public int TripleDouble { get; set; }

        public int QuadDouble { get; set; }

        public int Minutes { get; set; }

        public int Turnovers { get; set; }

        public int MadeThrees { get; set; }
    }
}