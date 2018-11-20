using System.ComponentModel.DataAnnotations;

namespace BasketballSupercoach.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 6, ErrorMessage = "You must specify password between 6 and 12 characters")]
        public string Password { get; set; }

        [Required]
        public string Teamname { get; set; }
    }
}