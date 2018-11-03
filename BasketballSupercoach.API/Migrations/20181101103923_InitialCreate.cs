using Microsoft.EntityFrameworkCore.Migrations;

namespace BasketballSupercoach.API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    playerId = table.Column<int>(nullable: false),
                    firstName = table.Column<string>(nullable: true),
                    surame = table.Column<string>(nullable: true),
                    positionOne = table.Column<int>(nullable: false),
                    positionTwo = table.Column<int>(nullable: false),
                    positionThree = table.Column<int>(nullable: false),
                    team = table.Column<string>(nullable: true),
                    price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    teamID = table.Column<int>(nullable: false),
                    userID = table.Column<int>(nullable: false),
                    teamname = table.Column<string>(nullable: true),
                    season = table.Column<string>(nullable: true),
                    selected = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamDetails", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "TeamDetails");
        }
    }
}
