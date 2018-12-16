namespace BasketballSupercoach.API.Dtos
{
    public class PlayerCardDto
    {
        public int PlayerId { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string Team { get; set; }

        public int Price { get; set; }

        public int PlayerPosition { get; set; }

        public int CardPosition { get; set; }

        public string CardPositionText { get; set; }

        public int averageScore { get; set; }

        public int isCaptain { get; set; }

        public int isSixthMan { get; set; }

        public int isEmergency { get; set; }

        public int lastScore { get; set; }

        public int userId { get; set; }
    }
}