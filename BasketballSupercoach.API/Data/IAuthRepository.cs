using System.Threading.Tasks;
using BasketballSupercoach.API.Models;

namespace BasketballSupercoach.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password, string teamname);

         Task<User> Login(string username, string password);

         Task<bool> UserExistis(string username);

         Task<bool> TeamnameExists(string teamname);
    }
}