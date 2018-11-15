using System.Collections.Generic;
using System.Threading.Tasks;
using BasketballSupercoach.API.Models;

namespace BasketballSupercoach.API.Data
{
    public interface IBasketballSupercoachRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int id);

         Task<IEnumerable<Player>> GetPlayers();
         
         Task<Player> GetPlayer(int id);
    }
}