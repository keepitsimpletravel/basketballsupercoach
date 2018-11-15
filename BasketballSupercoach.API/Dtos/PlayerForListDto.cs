namespace BasketballSupercoach.API.Dtos
{
    public class PlayerForListDto
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public int PositionOne { get; set; }

        public int PositionTwo { get; set; }

        public int PositionThree { get; set; }

        public string Team { get; set; }

        public int Price { get; set; }
    }
}