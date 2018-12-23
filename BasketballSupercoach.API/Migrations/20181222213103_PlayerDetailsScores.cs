using Microsoft.EntityFrameworkCore.Migrations;

namespace BasketballSupercoach.API.Migrations
{
    public partial class PlayerDetailsScores : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlayerGames",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GameId = table.Column<int>(nullable: false),
                    PlayerId = table.Column<int>(nullable: false),
                    GameDate = table.Column<string>(nullable: true),
                    ThreesMade = table.Column<int>(nullable: false),
                    OffRebounds = table.Column<int>(nullable: false),
                    DefRebounds = table.Column<int>(nullable: false),
                    Assists = table.Column<int>(nullable: false),
                    Turnovers = table.Column<int>(nullable: false),
                    Steals = table.Column<int>(nullable: false),
                    Blocks = table.Column<int>(nullable: false),
                    Minutes = table.Column<int>(nullable: false),
                    Points = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerGames", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlayerScores",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PlayerId = table.Column<int>(nullable: false),
                    GameId = table.Column<int>(nullable: false),
                    GameDate = table.Column<string>(nullable: true),
                    Score = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerScores", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerGames");

            migrationBuilder.DropTable(
                name: "PlayerScores");
        }
    }
}
