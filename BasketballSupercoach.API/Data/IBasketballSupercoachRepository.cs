using System.Collections.Generic;
using System.Threading.Tasks;
using BasketballSupercoach.API.Dtos;
using BasketballSupercoach.API.Models;

namespace BasketballSupercoach.API.Data
{
    public interface IBasketballSupercoachRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();

         Task<PlayersWithScoresDto> GetPlayerWithScores(int id);

         Task<User> GetUser(int id);

         Task<int> GetRoundRank(int id);

         Task<int> GetCurrentRound();

         Task<int> GetTotalRank(int id);

         Task<decimal> GetRoundScore(int id);

         Task<decimal> GetTotalScore(int id);

         Task<ScoringSystem> GetScoringSystem();

         Task<bool> UpdateScoringSystem(ScoringSystem scoring);

         Task<bool> RunScoresForDate(string value);

         Task<bool> RunTeamScoresForDate(RunTeamDateDto value);

         Task<bool> CreateNewRound(RoundDto value);

         Task<bool> CreateTeamScoresForRound(RoundDto round);

         Task<IEnumerable<PlayersWithScoresDto>> GetPlayers();

         int GetTotalScoreForPlayer(int playerId);

         int GetAverageScoreForPlayer(int playerId);

         Task<IEnumerable<PlayersWithScoresDto>> GetSpecificPlayers(int pos);
         
         Task<Player> GetPlayer(int id);

         Task<User> GetUser(string username);

         Task<bool> CreateTeamSalary(TeamSalary teamSalary);

         Task<bool> UpdateTeamSalary(TeamSalary teamSalary);

         Task<bool> CreateTeamDetailRecord(TeamDetail teamDetail);

         Task<bool> UpdateTeamDetail(TeamDetail teamDetail);

         Task<bool> UpdateTeamDetail(PlayerCardDto teamDetail);

         TeamDetail GetTeamDetailForPosition(int userId, int position);

         Task<bool> UpdateUserSalarySet(User user);

         Task<bool> UpdateLockout(int value);

         Task<int> GetCompetitionStatus();

         Task<TeamSalary> GetTeamSalary(int userId);

        //  Task<IEnumerable<TeamDetail>> GetTeamDetailsForUser(int userId);

         Task<IEnumerable<PlayerCardDto>> GetPlayerCardsForUser(int userId);
    }
}