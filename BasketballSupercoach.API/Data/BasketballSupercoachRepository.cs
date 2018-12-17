using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BasketballSupercoach.API.Dtos;
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

    public async Task<ScoringSystem> GetScoringSystem()
        {
            var scoring = await _content.ScoringSystems.FirstOrDefaultAsync();
            return scoring;
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

        public async Task<TeamSalary> GetTeamSalary(int userId) {
            var teamSal = await _content.TeamSalary.FirstOrDefaultAsync(ts => ts.UserId == userId);
            return teamSal;
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

        public async Task<bool> CreateTeamSalary(TeamSalary teamSalary) {
            await _content.TeamSalary.AddAsync(teamSalary);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateTeamDetailRecord(TeamDetail teamDetail) {
            await _content.TeamDetails.AddAsync(teamDetail);
            return await _content.SaveChangesAsync() > 0;
        }

        public TeamDetail GetTeamDetailForPosition(int userId, int position) {
            var teamdetail = _content.TeamDetails.FirstOrDefault(td => td.UserId == userId && td.Position == position);
            _content.Entry(teamdetail).State = EntityState.Detached;
            return teamdetail;
        }

        public async Task<bool> UpdateTeamDetail(TeamDetail teamDetail) {
            _content.TeamDetails.Update(teamDetail);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateUserSalarySet(User user) {
            _content.Users.Update(user);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateTeamSalary(TeamSalary teamSalary) {
            _content.TeamSalary.Update(teamSalary);
            // await CreateTeamSalary(teamSalary);
            return await _content.SaveChangesAsync() > 0;
        }

        // public async Task<IEnumerable<TeamDetail>> GetTeamDetailsForUser(int userId)
        // {
        //     var teamDetails = await _content.TeamDetails.Where(x => x.UserId == userId).ToListAsync();
        //     return teamDetails;
        // }

        public async Task<IEnumerable<PlayerCardDto>> GetPlayerCardsForUser(int userId) {
            var teamDetails = await _content.TeamDetails.Where(x => x.UserId == userId).ToListAsync();

            List<PlayerCardDto> playerCardsList = new List<PlayerCardDto>();

            // Now is where I need to update things
            // Need to go through and set each player card

            for(var pos = 1; pos <= 13; pos++) {
                // Position 1
                var matched = 0;
                for(var i = 0; i < teamDetails.Count; i++) {
                    TeamDetail detail = teamDetails[i];

                    if(detail.Position == pos) {
                        // Need to get the player object
                        Player player = await _content.Players.FirstOrDefaultAsync(p => p.PlayerId == detail.PlayerId);

                        PlayerCardDto pgDto = new PlayerCardDto();
                        pgDto.PlayerId = detail.PlayerId;
                        pgDto.averageScore = 0;
                        pgDto.CardPosition = pos;
                        pgDto.CardPositionText = GetPositionText(pos);
                        pgDto.FirstName = player.FirstName;
                        pgDto.lastScore = 0;
                        pgDto.PlayerPosition = player.PositionOne;
                        pgDto.Price = player.Price;
                        pgDto.Surname = player.Surname;
                        pgDto.Team = player.Team;
                        pgDto.isCaptain = detail.Captain;
                        pgDto.isSixthMan = detail.SixthMan;
                        pgDto.isEmergency = detail.Emergency;

                        playerCardsList.Add(pgDto);

                        matched = 1;
                    }
                }

                if (matched == 0) {
                    // no match was found, need to add empty player card
                    PlayerCardDto pgDto = new PlayerCardDto();
                    pgDto.PlayerId = 0;
                    pgDto.averageScore = 0;
                    pgDto.CardPosition = pos;
                    pgDto.CardPositionText = GetPositionText(pos);
                    pgDto.FirstName = "";
                    pgDto.lastScore = 0;
                    pgDto.PlayerPosition = 0;
                    pgDto.Price = 0;
                    pgDto.Surname = "";
                    pgDto.Team = "";

                    playerCardsList.Add(pgDto);
                }
            }

            return playerCardsList;
        }

        public string GetPositionText(int pos) {
            string positionString = "";

            switch (pos) {
                case 1:
                    positionString = "Point Guard";
                    break;
                case 2:
                    positionString = "Shooting Guard";
                    break;
                case 3:
                    positionString = "Small Forward";
                    break;
                case 4:
                    positionString = "Power Forward";
                    break;
                case 5:
                    positionString = "Centre";
                    break;
                case 6:
                    positionString = "Bench #1";
                    break;
                case 7:
                    positionString = "Bench #2";
                    break;
                case 8:
                    positionString = "Bench #3";
                    break;
                case 9:
                    positionString = "Bench #4";
                    break;
                case 10:
                    positionString = "Bench #5";
                    break;
                case 11:
                    positionString = "Inactive #1";
                    break;
                case 12:
                    positionString = "Inactive #2";
                    break;
                case 13:
                    positionString = "Inactive #3";
                    break;
            }
            return positionString;
        }
    }
}