namespace BasketballSupercoach.API.Models
{
    public class Player
    {
        public int Id { get; set; }
        public int playerId { get; set; }

        public string firstName { get; set; }

        public string surame { get; set; }

        public int positionOne { get; set; }

        public int positionTwo { get; set; }

        public int positionThree { get; set; }

        public string team { get; set; }

        public int price { get; set; }
    }
}