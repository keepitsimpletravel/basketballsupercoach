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

        public async Task<PlayersWithScoresDto> GetPlayerWithScores(int id)
        {
            var player = await _content.Players.FirstOrDefaultAsync(p => p.PlayerId == id);

            PlayersWithScoresDto dto = new PlayersWithScoresDto();
            dto.FirstName = player.FirstName;
            dto.Id = player.Id;
            dto.PlayerId = player.PlayerId;
            dto.PositionOne = player.PositionOne;
            dto.PositionTwo = player.PositionTwo;
            dto.PositionThree = player.PositionThree;
            dto.Price = player.Price;
            dto.Surname = player.Surname;
            dto.Team = player.Team;

            //  Now need to get the average
            dto.AverageScore = GetAverageScoreForPlayer(id);
            dto.TotalScore = GetTotalScoreForPlayer(id);

            PlayerScores lastPS =  _content.PlayerScores.OrderByDescending(x => x.GameDate).FirstOrDefault(p => p.PlayerId == player.PlayerId);

            if(lastPS != null) {
                dto.LastScore = lastPS.Score;
            } else {
                dto.LastScore = 0;
            }
            

            return dto;
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

        // public async Task<bool> RunTeamScoresForDate(RunTeamDateDto value) 
        // {
        //     // Get the current round
        //     var round = await _content.Rounds.FromSql("SELECT * FROM Rounds where CAST(startDate AS INT) <= {0} and CAST(endDate AS INT) >= {0}", value.RunDate).FirstOrDefaultAsync();

        //     // What will be happening is for each userId
        //     var users = await _content.Users.ToListAsync();

        //     foreach(var user in users) {
        //         decimal daysScore = 0;

        //         // Need to get the current rounds score

        //         // Their teamDetails are got
        //         var teamdetails = await _content.TeamDetails.FromSql("SELECT * FROM TeamDetails where userId = {0}", user.Id).ToListAsync();

        //         // Then for each teamdetail record
        //         foreach(var teamdetail in teamdetails) {
        //             // Check to see if there is a score for the player for the gameDate of value
        //             var playerScore = await _content.PlayerScores.FromSql("SELECT * FROM PlayerScores where PlayerId = {0} and GameDate = {1}", teamdetail.PlayerId, value.RunDate).ToListAsync();

        //             if(playerScore.Count > 0) {
        //                 // if yes add the score to the team score after applying any bonuses (C or 6)
        //                 if(teamdetail.Position <= 10) {
        //                     if(teamdetail.Position == teamdetail.Captain) {
        //                         daysScore = daysScore + (playerScore[0].Score * 2);
        //                     } else if (teamdetail.Position == teamdetail.SixthMan) {
        //                         decimal tempValue = (decimal) playerScore[0].Score;
        //                         daysScore = daysScore + tempValue;
        //                     } else {
        //                         daysScore = daysScore + playerScore[0].Score;
        //                     }
        //                 }
        //             }
        //         }
                
        //         // once all teamDetails are completed for the user, then update entry to the TeamScore table for the day
        //         var teamScore = await _content.TeamScores.FirstOrDefaultAsync(t => t.RoundId == round.RoundNumber && t.UserId == user.Id);

        //         // TeamScore ts = new TeamScore();
        //         teamScore.UserId = user.Id;
        //         teamScore.RoundId = round.RoundNumber;
        //         teamScore.Total = daysScore / 100;

        //         // Now need to update the TeamScore
        //         _content.TeamScores.Update(teamScore);
        //     }
        //     return await _content.SaveChangesAsync() > 0;
        // }

        public async Task<bool> RunTeamScoresForDate(RunTeamDateDto value) 
        {
            // Get the current round
            var round = await _content.Rounds.FromSql("SELECT * FROM Rounds where CAST(startDate AS INT) <= {0} and CAST(endDate AS INT) >= {0}", value.RunDate).FirstOrDefaultAsync();

            // What will be happening is for each userId
            var users = await _content.Users.ToListAsync();

            foreach(var user in users) {
                decimal daysScore = 0;

                // Need to get the current rounds score

                // Their teamDetails are got
                var teamdetails = await _content.TeamDetails.FromSql("SELECT * FROM TeamDetails where userId = {0}", user.Id).ToListAsync();

                // Then for each teamdetail record
                foreach(var teamdetail in teamdetails) {
                    // Check to see if there is a score for the player for the gameDate of value
                    var playerScore = await _content.PlayerScores.FromSql("SELECT * FROM PlayerScores where PlayerId = {0} and GameDate = {1}", teamdetail.PlayerId, value.RunDate).ToListAsync();

                    if(playerScore.Count > 0) {
                        // if yes add the score to the team score after applying any bonuses (C or 6)
                        if(teamdetail.Position <= 10) {
                            if(teamdetail.Position == teamdetail.Captain) {
                                daysScore = daysScore + (playerScore[0].Score * 2);
                            } else if (teamdetail.Position == teamdetail.SixthMan) {
                                decimal tempValue = (decimal) playerScore[0].Score;
                                daysScore = daysScore + tempValue;
                            } else {
                                daysScore = daysScore + playerScore[0].Score;
                            }
                        }
                    }
                }
                
                // // once all teamDetails are completed for the user, then update entry to the TeamScore table for the day
                // var teamScore = await _content.TeamScores.FirstOrDefaultAsync(t => t.RoundId == round.RoundNumber && t.UserId == user.Id);

                // // TeamScore ts = new TeamScore();
                // // teamScore.UserId = user.Id;
                // // teamScore.RoundId = round.RoundNumber;
                // // teamScore.Total = daysScore / 100;

                // // // Now need to update the TeamScore
                // // _content.TeamScores.Update(teamScore);
                var teamScore = _content.TeamScores.FirstOrDefault(t => t.RoundId == round.RoundNumber && t.UserId == user.Id);
 
                TeamScore ts = new TeamScore();
                if(teamScore == null) {
                    // ts.UserId = user.Id;
                    // ts.RoundId = round.RoundNumber;
                    // ts.Total = (int)daysScore;
               
                    // // Create a new record
                    // await _content.TeamScores.AddAsync(ts);
                } else {
                    // ts.Id = teamScore.Id;
                    teamScore.UserId = user.Id;
                    teamScore.RoundId = round.RoundNumber;
                    teamScore.Total = (int)daysScore;
               
                    // Update
                    _content.TeamScores.Update(teamScore);
                }
            }
                return true;//await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateNewRound(RoundDto value)
        {
            Round round = new Round();
            round.RoundNumber = value.RoundNumber;
            round.StartDate = value.StartDate;
            round.EndDate = value.EndDate;
            await _content.Rounds.AddAsync(round);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateTeamScoresForRound(RoundDto round)
        {
            var users = await _content.Users.ToListAsync();

            foreach(var user in users) {
                // Need to create the TeamScore for the Round
                TeamScore ts = new TeamScore();
                ts.RoundId = round.RoundNumber;
                ts.Total = 0;
                ts.UserId = user.Id;
                await _content.TeamScores.AddAsync(ts);
            }
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> CreateNewTeamScores(int round) {
            List<int> allUsers = await _content.Users.Select(x => x.Id).Distinct().ToListAsync();
            List<int> allTeamScoreUsers = await _content.TeamScores.Select(x => x.UserId).Distinct().ToListAsync();

            // foreach (int idValue in allUsers) {
            var exists = allUsers.Except(allTeamScoreUsers).ToList();
            // }
            // var firstNotSecond = list1.Except(list2).ToList();

            foreach(int value in exists) {
                // Need to create a new TeamScore for the current round
                TeamScore ts = new TeamScore();
                ts.RoundId = round;
                ts.Total = 0;
                ts.UserId = value;
                await _content.TeamScores.AddAsync(ts);
            }
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> RunScoresForDate(string value)
        {
            // Get the scoring system
            var scoring = await _content.ScoringSystems.FirstOrDefaultAsync();

            string url = "https://api.mysportsfeeds.com/v2.0/pull/nba/2018-19-regular/date/" + value + "/player_gamelogs.json";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create (new Uri(url));

            // string username = "ebe965ee-1ebd-4e1c-a9dd-0e324c";
            string username = "f8c4bdff-7210-463a-859f-811fa2";
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

                    string first = gamelog.player.firstName;
                    string last = gamelog.player.lastName;

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
            var players = await _content.Players.OrderByDescending(a => a.Price).ToListAsync();

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
            var players = await _content.Players.OrderByDescending(a => a.Price).ToListAsync();
            List<PlayersWithScoresDto> filterPlayers = new List<PlayersWithScoresDto>();
            if (pos <= 5) {
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
            _content.TeamDetails.Update(teamDetail); // cant make this async
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateTeamDetail(PlayerCardDto teamDetail) {
            TeamDetail td = _content.TeamDetails.FirstOrDefault(x => x.UserId == teamDetail.userId && x.Position == teamDetail.CardPosition);
            td.PlayerId = teamDetail.PlayerId;
            _content.TeamDetails.Update(td);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateUserSalarySet(User user) {
            _content.Users.Update(user);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateTeamSalary(TeamSalary teamSalary) {
            _content.TeamSalary.Update(teamSalary);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<int> GetRoundRank(int id)
        {
            // Need to get the current round
            // DateTime dateTime = DateTime.UtcNow.Date;

            // string currentDate = dateTime.ToString("yyyyMMdd");
            // int value = Convert.ToInt32(currentDate);
            int value = 20181016;
            Round round = _content.Rounds.FromSql("SELECT * FROM Rounds where CAST(startDate AS INT) <= {0} and CAST(endDate AS INT) >= {0}", value).FirstOrDefault();
            
            if(round != null) {
                // Now need to get the user's rank
                List <TeamScore> ts = await _content.TeamScores.FromSql("select * from TeamScores where RoundId = {0} order by Total desc", round.RoundNumber).ToListAsync();

                // Now need to find what rank the user is for the round
                for (int i = 0; i < ts.Count; i++) {
                    if (ts[i].UserId == id) {
                        // We have a match
                        return i+1;
                    }
                }
            } 
            
            return 0;
        }

        public async Task<int> GetCurrentRound(){
            // Need to get the current round
            // DateTime dateTime = DateTime.UtcNow.Date;

            // string currentDate = dateTime.ToString("yyyyMMdd");
            // int value = Convert.ToInt32(currentDate);
            int value = 20181018;
            Round round = await _content.Rounds.FromSql("SELECT * FROM Rounds where CAST(startDate AS INT) <= {0} and CAST(endDate AS INT) >= {0}", value).FirstOrDefaultAsync();

            if(round != null) {
                return round.RoundNumber;
            }
            return 0;
        }
        
        public async Task<decimal> GetRoundScore(int id)
        {
            // Need to get the current round
            // DateTime dateTime = DateTime.UtcNow.Date;

            // string currentDate = dateTime.ToString("yyyyMMdd");
            // int value = Convert.ToInt32(currentDate);
            int value = 20181016;
            Round round = _content.Rounds.FromSql("SELECT * FROM Rounds where CAST(startDate AS INT) <= {0} and CAST(endDate AS INT) >= {0}", value).FirstOrDefault();
            
            if (round != null) {
                TeamScore ts = await _content.TeamScores.FromSql("SELECT * FROM TeamScores where RoundId = {0} and UserId = {1}", round.RoundNumber, id).FirstOrDefaultAsync();
                return ts.Total;
            }
            return 0;
        }

        public async Task<int> GetTotalRank(int id)
        {
            // This query
            // List<TeamScore> ts = await _content.TeamScores.FromSql("SELECT max(UserID), sum(RoundId), SUM(total) AS Total FROM TeamScores GROUP BY UserId").ToListAsync();
            List<TeamScore> ts = await _content.TeamScores.ToListAsync();

            for (int i = 0; i < ts.Count; i++) {
                if (ts[i].UserId == id) {
                    // We have a match
                    return i+1;
                }
            }    
            return 0;        
        }

        public async Task<decimal> GetTotalScore(int id)
        {
            List<TeamScore> ts = await _content.TeamScores.FromSql("SELECT * FROM TeamScores where UserId = {0}", id).ToListAsync();

            decimal total = 0;
            for (int i = 0; i < ts.Count; i++) {
                total = total + ts[i].Total;
            }

            if (total != 0) {
                return total / 100;
            }
            return 0;
        }

        public async Task<bool> UpdateLockout(int value)
        {
            Lockout lockout = new Lockout
            {
                Id = 1,
                Locked = value
            };
            _content.Lockouts.Update(lockout);
            return await _content.SaveChangesAsync() > 0;
        }

        public async Task<int> GetCompetitionStatus() {
            var state = await _content.Lockouts.ToListAsync();

            return state[0].Locked;
        }

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

                        int averageScore = 0;
                        int lastScore = 0;
                        if (ps == null) {
                            lastScore = 0;
                        } else {
                            averageScore = this.GetAverageScoreForPlayer(player.PlayerId);
                            lastScore = ps.Score;
                        }

                        PlayerCardDto pgDto = new PlayerCardDto();
                        pgDto.PlayerId = detail.PlayerId;
                        pgDto.averageScore = averageScore;
                        pgDto.CardPosition = pos;
                        pgDto.CardPositionText = GetPositionText(pos);
                        pgDto.FirstName = player.FirstName;
                        pgDto.lastScore = lastScore;
                        pgDto.PlayerPosition = player.PositionOne;
                        pgDto.PlayerPositionTwo = player.PositionTwo;
                        pgDto.PlayerPositionThree = player.PositionThree;
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
                    pgDto.PlayerPositionTwo = 0;
                    pgDto.PlayerPositionThree = 0;
                    pgDto.Price = 0;
                    pgDto.Surname = "";
                    pgDto.Team = "";

                    playerCardsList.Add(pgDto);
                }
            }

            return playerCardsList;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            List<User> users = await _content.Users.ToListAsync();
            return users;
        }

        public async Task<IEnumerable<TeamDetail>> GetTeamDetailsForUser(int id)
        {
            List<TeamDetail> teamdetails = await _content.TeamDetails.FromSql("SELECT * FROM TeamDetails where userId = {0}", id).ToListAsync();
            return teamdetails;
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