namespace BasketballSupercoach.API.Dtos
{
    public class TeamSalaryCreationDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int AvailableSalary { get; set; }
    }
}