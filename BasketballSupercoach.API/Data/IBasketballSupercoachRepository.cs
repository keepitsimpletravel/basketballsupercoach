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

         Task<IEnumerable<Player>> GetSpecificPlayers(int pos);
         
         Task<Player> GetPlayer(int id);

         Task<User> GetUser(string username);

         Task<bool> CreateTeamSalary(TeamSalary teamSalary);

         Task<bool> CreateTeamDetailRecord(TeamDetail teamDetail);

         Task<bool> UpdateUserSalarySet(User user);

         
    }
}