using System.Collections.Generic;
using System.Threading.Tasks;
using BasketballSupercoach.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BasketballSupercoach.API.Data
{
    public class BasketballSupercoachRepository : IBasketballSupercoachRepository
    {
        private readonly DataContext _content;
        public BasketballSupercoachRepository(DataContext content)
        {
            _content = content;
        }

        public void Add<T>(T entity) where T : class
        {
            _content.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _content.Remove(entity);
        }

        public async Task<Player> GetPlayer(int id)
        {
            var player = await _content.Players.FirstOrDefaultAsync(p => p.PlayerId == id);

            return player;
        }

        public async Task<IEnumerable<Player>> GetPlayers()
        {
            var players = await _content.Players.ToListAsync();

            return players;
        }

        public async Task<IEnumerable<Player>> GetSpecificPlayers(int pos)
        {
            var players = await _content.Players.ToListAsync();
            List<Player> filterPlayers = new List<Player>();
            if (pos < 5) {
                // need to filter returned players
                foreach(Player player in players) {
                    if(player.PositionOne == pos || player.PositionTwo == pos || player.PositionThree == pos) {
                        filterPlayers.Add(player);
                    }
                }
            } else {
                // else return all
                filterPlayers = players;
            }

            return filterPlayers;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _content.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            
            return user;
        }

        public async Task<User> GetUser(string username)
        {
            var user = await _content.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Username == username);
            
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _content.Users.Include(p => p.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _content.SaveChangesAsync() > 0;
        }
    }
}