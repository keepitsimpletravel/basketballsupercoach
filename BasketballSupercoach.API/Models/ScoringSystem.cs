using System.ComponentModel.DataAnnotations.Schema;

namespace BasketballSupercoach.API.Models
{
    public class ScoringSystem
    {
        public int Id { get; set; }

        public int Points { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal ORebounds { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal DRebounds { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Assists { get; set; }

        public int Steals { get; set; }

        public int Blocks { get; set; }

        public int DoubleDouble { get; set; }

        public int TripleDouble { get; set; }

        public int QuadDouble { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Minutes { get; set; }

        public int Turnovers { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal MadeThrees { get; set; }
    }
}