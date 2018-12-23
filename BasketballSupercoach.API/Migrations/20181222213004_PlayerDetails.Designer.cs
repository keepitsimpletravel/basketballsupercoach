﻿// <auto-generated />
using System;
using BasketballSupercoach.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BasketballSupercoach.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20181222213004_PlayerDetails")]
    partial class PlayerDetails
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("BasketballSupercoach.API.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<string>("Url");

                    b.Property<int>("UserID");

                    b.HasKey("Id");

                    b.HasIndex("UserID");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName");

                    b.Property<int>("PlayerId");

                    b.Property<int>("PositionOne");

                    b.Property<int>("PositionThree");

                    b.Property<int>("PositionTwo");

                    b.Property<int>("Price");

                    b.Property<string>("Surname");

                    b.Property<string>("Team");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.ScoringSystem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Assists")
                        .HasColumnType("decimal(1, 2)");

                    b.Property<int>("Blocks");

                    b.Property<decimal>("DRebounds")
                        .HasColumnType("decimal(1, 2)");

                    b.Property<int>("DoubleDouble");

                    b.Property<decimal>("MadeThrees")
                        .HasColumnType("decimal(1, 2)");

                    b.Property<decimal>("Minutes")
                        .HasColumnType("decimal(1, 2)");

                    b.Property<decimal>("ORebounds")
                        .HasColumnType("decimal(1, 2)");

                    b.Property<int>("Points");

                    b.Property<int>("QuadDouble");

                    b.Property<int>("Steals");

                    b.Property<int>("TripleDouble");

                    b.Property<int>("Turnovers");

                    b.HasKey("Id");

                    b.ToTable("ScoringSystems");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.TeamDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Active");

                    b.Property<int>("Captain");

                    b.Property<int>("Emergency");

                    b.Property<int>("PlayerId");

                    b.Property<int>("Position");

                    b.Property<int>("SixthMan");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.ToTable("TeamDetails");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.TeamSalary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AvailableSalary");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.ToTable("TeamSalary");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Active");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<int>("SalarySet");

                    b.Property<int>("TeamSelected");

                    b.Property<string>("Teamname");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.Photo", b =>
                {
                    b.HasOne("BasketballSupercoach.API.Models.User", "User")
                        .WithMany("Photos")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
