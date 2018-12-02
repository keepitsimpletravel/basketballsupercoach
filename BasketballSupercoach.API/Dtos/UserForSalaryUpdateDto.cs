namespace BasketballSupercoach.API.Dtos
{
    public class UserForSalaryUpdateDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Teamname { get; set; }

        public int SalarySet { get; set; }
    }
}