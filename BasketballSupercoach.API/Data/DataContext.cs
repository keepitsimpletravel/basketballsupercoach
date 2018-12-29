using Microsoft.EntityFrameworkCore;
using BasketballSupercoach.API.Models;

namespace BasketballSupercoach.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options)
        {
            
        }

        public DbSet<Player> Players { get; set; }

        public DbSet<TeamDetail> TeamDetails { get; set; }

        public DbSet<TeamSalary> TeamSalary { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; } 

        public DbSet<ScoringSystem> ScoringSystems { get; set; } 

        public DbSet<PlayerGame> PlayerGames { get; set; }

        public DbSet<PlayerScores> PlayerScores { get; set; }

        public DbSet<Round> Rounds { get; set; }

        public DbSet<TeamScore> TeamScores { get; set; }

        public DbSet<Lockout> Lockouts { get; set; }
    }
}