using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BasketballSupercoach.API.Dtos;
using BasketballSupercoach.API.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Text;
using Newtonsoft.Json;

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

        public async Task<bool> UpdateScoringSystem(ScoringSystem scoring) {
            _content.ScoringSystems.Update(scoring);
            return await _content.SaveChangesAsync() > 0;
        }

        public int GetTotalScoreForPlayer(int playerId) {
            // await _content.PlayerScores.OrderByDescending(x => x.GameDate).FirstOrDefault(p => p.PlayerId == playerId);
            var playerScores = _content.PlayerScores.ToList();
            List<PlayerScores> scores = playerScores.Where(p => p.PlayerId == playerId).ToList();
            int total = 0;
            foreach(var score in scores) {
                total = total + score.Score;
            }
            return total;
        }

        public int GetAverageScoreForPlayer(int playerId) {
            // await _content.PlayerScores.OrderByDescending(x => x.GameDate).FirstOrDefault(p => p.PlayerId == playerId);
            var playerScores = _content.PlayerScores.ToList();
            List<PlayerScores> scores = playerScores.Where(p => p.PlayerId == playerId).ToList();
            int total = 0;
            foreach(var score in scores) {
                total = total + score.Score;
            }
            int average = 0;
            if(total != 0) {
                average = total / scores.Count;
            }
            return average;
        }

        public async Task<bool> RunScoresForDate(string value)
        {
            // Get the scoring system
            var scoring = await _content.ScoringSystems.FirstOrDefaultAsync();

            string url = "https://api.mysportsfeeds.com/v2.0/pull/nba/2018-19-regular/date/" + value + "/player_gamelogs.json";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create (new Uri(url));

            string username = "ebe965ee-1ebd-4e1c-a9dd-0e324c";
            string password = "MYSPORTSFEEDS";

            byte[] userPassBytes = Encoding.UTF8.GetBytes(string.Format("{0}:{1}", username, password));
            string userPassBase64 = Convert.ToBase64String(userPassBytes);
            request.Headers.Add("Authorization", "Basic " + userPassBase64);
            request.Method = "GET";
            using(HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
            using(Stream stream = response.GetResponseStream())
            using(StreamReader reader = new StreamReader(stream))
            {
                string json = await reader.ReadToEndAsync();
                dynamic jsonValues = JsonConvert.DeserializeObject(json);
                // string luo = jsonValues.lastUpdatedOn;
                foreach(var gamelog in jsonValues.gamelogs) {
                    // Now need to get the required details
                    int gameId = gamelog.game.id;
                    // value is the date for the game
                    int playerId = gamelog.player.id;
                    int madeThrees = gamelog.stats.fieldGoals.fg3PtMade;
                    int missedFTs = gamelog.stats.freeThrows.ftAtt - gamelog.stats.freeThrows.ftMade;
                    int offReb = gamelog.stats.rebounds.offReb;
                    int defReb = gamelog.stats.rebounds.defReb;
                    int rebs = gamelog.stats.rebounds.reb;
                    int asts = gamelog.stats.offense.ast;
                    int points = gamelog.stats.offense.pts;
                    int turnovers = gamelog.stats.defense.tov;
                    int steals = gamelog.stats.defense.stl;
                    int blocks = gamelog.stats.defense.blk;
                    int fouls = gamelog.stats.miscellaneous.fouls;
                    int minutes = gamelog.stats.miscellaneous.minSeconds / 60;

                    int dd = 0;
                    if ((points >= 10 && rebs >= 10) || (points >= 10 && asts >= 10) || (points >=10 && steals >= 10) || (points >=10 && blocks >=10)
                     || (rebs >=10 && asts >=10) || (rebs >=10 && steals >=10) || (rebs >=10 && blocks >=10) || (asts >=10 && steals>=10) || (asts >=10 && blocks >=10)
                     || (steals>=10 && blocks >=10)) {
                        dd = 1;
                    }

                    int td = 0;
                    if ((points >=10 && rebs >=10 && asts >=10) || (points >=10 && rebs>=10 && steals>=10) || (points>=10 && rebs>=10 && blocks>=10) || (points>=10 && asts>=10 && steals>=10)
                    || (points>=10 && asts>=10 & blocks>=10) || (points>=10 && steals>=10 && blocks>=10) && (rebs>=10 && asts>=10 && steals>=10) || (rebs>=10 && asts>=10 && blocks>=10)
                    || (rebs>=10 && steals>=10 && blocks>=10) || (asts>=10 && steals>=10 && blocks>=10)) {
                        td = 1;
                    }

                    // Now need to determine the players score
                    decimal playersScore = (madeThrees * scoring.MadeThrees) + (offReb * scoring.ORebounds) + (defReb * scoring.DRebounds)
                        + (asts * scoring.Assists) + (points * scoring.Points) + ((turnovers * scoring.Turnovers) * -1) +(steals * scoring.Steals)
                        + (blocks * scoring.Blocks) + (td * scoring.TripleDouble) + (dd * scoring.DoubleDouble);

                    // Create the PlayerGame object
                    PlayerGame game = new PlayerGame();
                    game.Assists = asts;
                    game.Blocks = blocks;
                    game.DefRebounds = defReb;
                    game.GameDate = value;
                    game.GameId = gameId;
                    game.Minutes = minutes;
                    game.OffRebounds = offReb;
                    game.PlayerId = playerId;
                    game.Points = points;
                    game.Steals = steals;
                    game.ThreesMade = madeThrees;
                    game.Turnovers = turnovers;

                    // Now add the PlayerGame record
                    await _content.PlayerGames.AddAsync(game);
                    // await _content.SaveChangesAsync();

                    // Now need to create the PlayerScore object and put this into the database
                    PlayerScores scores= new PlayerScores();
                    scores.GameDate = value;
                    scores.GameId = gameId;
                    scores.PlayerId = playerId;
                    scores.Score = Convert.ToInt32(playersScore * 100);
                    
                    await _content.PlayerScores.AddAsync(scores);
                    await _content.SaveChangesAsync();
                }
            }
            return true;
        }

        public async Task<IEnumerable<PlayersWithScoresDto>> GetPlayers()
        {
            var players = await _content.Players.ToListAsync();

            List<PlayersWithScoresDto> playersWithScore = new List<PlayersWithScoresDto>();
            // need to go through and get each last score for each player and then return the Dto
            foreach (var player in players) {
                PlayerScores lastPS =  _content.PlayerScores.OrderByDescending(x => x.GameDate).FirstOrDefault(p => p.PlayerId == player.PlayerId);
                int totalScore = this.GetTotalScoreForPlayer(player.PlayerId);
                int averageScore = this.GetAverageScoreForPlayer(player.PlayerId);

                PlayersWithScoresDto newDto = new PlayersWithScoresDto();
                newDto.FirstName = player.FirstName;
                newDto.Id = player.Id;

                if(lastPS == null) {
                    newDto.LastScore = 0;
                } else {
                    newDto.LastScore = lastPS.Score;
                }

                newDto.TotalScore = totalScore;
                newDto.AverageScore = averageScore;
                newDto.PlayerId = player.PlayerId;
                newDto.PositionOne = player.PositionOne;
                newDto.PositionThree = player.PositionThree;
                newDto.PositionTwo = player.PositionTwo;
                newDto.Price = player.Price;
                newDto.Surname = player.Surname;
                newDto.Team = player.Team;

                playersWithScore.Add(newDto);
            }

            return playersWithScore;
        }

        public async Task<IEnumerable<PlayersWithScoresDto>> GetSpecificPlayers(int pos)
        {
            var players = await _content.Players.ToListAsync();
            List<PlayersWithScoresDto> filterPlayers = new List<PlayersWithScoresDto>();
            if (pos < 5) {
                // need to filter returned players
                foreach(Player player in players) {
                    if(player.PositionOne == pos || player.PositionTwo == pos || player.PositionThree == pos) {
                        PlayerScores ps =  _content.PlayerScores.OrderByDescending(x => x.GameDate).FirstOrDefault(p => p.PlayerId == player.PlayerId);

                        PlayersWithScoresDto newDto = new PlayersWithScoresDto();
                        newDto.FirstName = player.FirstName;
                        newDto.Id = player.Id;

                        if(ps == null) {
                            newDto.LastScore = 0;
                        } else {
                            newDto.LastScore = ps.Score;
                        }
                
                        newDto.PlayerId = player.PlayerId;
                        newDto.PositionOne = player.PositionOne;
                        newDto.PositionThree = player.PositionThree;
                        newDto.PositionTwo = player.PositionTwo;
                        newDto.Price = player.Price;
                        newDto.Surname = player.Surname;
                        newDto.Team = player.Team;

                        filterPlayers.Add(newDto);
                    }
                }
            } else {
                // else return all
                foreach(Player player in players) {
                    PlayerScores ps =  _content.PlayerScores.OrderByDescending(x => x.GameDate).FirstOrDefault(p => p.PlayerId == player.PlayerId);

                    PlayersWithScoresDto newDto = new PlayersWithScoresDto();
                    newDto.FirstName = player.FirstName;
                    newDto.Id = player.Id;

                    if(ps == null) {
                        newDto.LastScore = 0;
                    } else {
                        newDto.LastScore = ps.Score;
                    }
                
                    newDto.PlayerId = player.PlayerId;
                    newDto.PositionOne = player.PositionOne;
                    newDto.PositionThree = player.PositionThree;
                    newDto.PositionTwo = player.PositionTwo;
                    newDto.Price = player.Price;
                    newDto.Surname = player.Surname;
                    newDto.Team = player.Team;

                    filterPlayers.Add(newDto);
                }
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

                        // Get the last score for the player
                        PlayerScores ps =  _content.PlayerScores.OrderByDescending(x => x.GameDate).FirstOrDefault(p => p.PlayerId == detail.PlayerId);

                        int averageScore = this.GetAverageScoreForPlayer(player.PlayerId);

                        PlayerCardDto pgDto = new PlayerCardDto();
                        pgDto.PlayerId = detail.PlayerId;
                        pgDto.averageScore = averageScore;
                        pgDto.CardPosition = pos;
                        pgDto.CardPositionText = GetPositionText(pos);
                        pgDto.FirstName = player.FirstName;
                        pgDto.lastScore = ps.Score;
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

        public static string Base64Encode(string plainText) {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }
}