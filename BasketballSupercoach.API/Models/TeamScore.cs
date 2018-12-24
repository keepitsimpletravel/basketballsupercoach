using System.ComponentModel.DataAnnotations.Schema;

namespace BasketballSupercoach.API.Models
{
    public class TeamScore
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int RoundId { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Total { get; set; }
    }
}