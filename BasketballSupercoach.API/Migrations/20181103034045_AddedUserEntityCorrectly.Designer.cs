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
    [Migration("20181103034045_AddedUserEntityCorrectly")]
    partial class AddedUserEntityCorrectly
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("BasketballSupercoach.API.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("firstName");

                    b.Property<int>("playerId");

                    b.Property<int>("positionOne");

                    b.Property<int>("positionThree");

                    b.Property<int>("positionTwo");

                    b.Property<int>("price");

                    b.Property<string>("surame");

                    b.Property<string>("team");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.TeamDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("season");

                    b.Property<int>("selected");

                    b.Property<int>("teamID");

                    b.Property<string>("teamname");

                    b.Property<int>("userID");

                    b.HasKey("Id");

                    b.ToTable("TeamDetails");
                });

            modelBuilder.Entity("BasketballSupercoach.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
