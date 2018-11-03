using System.Threading.Tasks;
using BasketballSupercoach.API.Models;

namespace BasketballSupercoach.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);

         Task<User> Login(string username, string password);

         Task<bool> UserExistis(string username);
    }
}