using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BasketballSupercoach.API.Migrations
{
    public partial class InitialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PlayerId = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    PositionOne = table.Column<int>(nullable: false),
                    PositionTwo = table.Column<int>(nullable: false),
                    PositionThree = table.Column<int>(nullable: false),
                    Team = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ScoringSystems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Points = table.Column<int>(nullable: false),
                    ORebounds = table.Column<int>(nullable: false),
                    DRebounds = table.Column<int>(nullable: false),
                    Assists = table.Column<int>(nullable: false),
                    Steals = table.Column<int>(nullable: false),
                    Blocks = table.Column<int>(nullable: false),
                    DoubleDouble = table.Column<int>(nullable: false),
                    TripleDouble = table.Column<int>(nullable: false),
                    QuadDouble = table.Column<int>(nullable: false),
                    Minutes = table.Column<int>(nullable: false),
                    Turnovers = table.Column<int>(nullable: false),
                    MadeThrees = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScoringSystems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    PlayerId = table.Column<int>(nullable: false),
                    Position = table.Column<int>(nullable: false),
                    Captain = table.Column<int>(nullable: false),
                    SixthMan = table.Column<int>(nullable: false),
                    Emergency = table.Column<int>(nullable: false),
                    Active = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamSalary",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    AvailableSalary = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamSalary", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Teamname = table.Column<string>(nullable: true),
                    TeamSelected = table.Column<int>(nullable: false),
                    Active = table.Column<int>(nullable: false),
                    SalarySet = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    UserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_UserID",
                table: "Photos",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "ScoringSystems");

            migrationBuilder.DropTable(
                name: "TeamDetails");

            migrationBuilder.DropTable(
                name: "TeamSalary");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
