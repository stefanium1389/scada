﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using scada_back.Context;

#nullable disable

namespace scada_back.Migrations
{
    [DbContext(typeof(ScadaDbContext))]
    [Migration("20230909105358_MyMigration")]
    partial class MyMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("scada_back.Models.Alarm", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Limit")
                        .HasColumnType("float")
                        .HasColumnName("limit");

                    b.Property<int>("Priority")
                        .HasColumnType("int")
                        .HasColumnName("priority");

                    b.Property<int?>("TagIdId")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int")
                        .HasColumnName("type");

                    b.HasKey("Id");

                    b.HasIndex("TagIdId");

                    b.ToTable("Alarms");
                });

            modelBuilder.Entity("scada_back.Models.AnalogInput", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("address");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("description");

                    b.Property<int>("DriverId")
                        .HasColumnType("int")
                        .HasColumnName("driver");

                    b.Property<int>("Function")
                        .HasColumnType("int")
                        .HasColumnName("function");

                    b.Property<double>("HighLimit")
                        .HasColumnType("float")
                        .HasColumnName("high_limit");

                    b.Property<bool>("IsScanning")
                        .HasColumnType("bit")
                        .HasColumnName("is_scanning");

                    b.Property<double>("LowLimit")
                        .HasColumnType("float")
                        .HasColumnName("low_limit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("name");

                    b.Property<int>("ScanTime")
                        .HasColumnType("int")
                        .HasColumnName("scan_time");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("unit");

                    b.HasKey("Id");

                    b.ToTable("AnalogInputs");
                });

            modelBuilder.Entity("scada_back.Models.AnalogOutput", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("address");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("description");

                    b.Property<double>("HighLimit")
                        .HasColumnType("float")
                        .HasColumnName("high_limit");

                    b.Property<int>("InitialValue")
                        .HasColumnType("int")
                        .HasColumnName("initial_value");

                    b.Property<double>("LowLimit")
                        .HasColumnType("float")
                        .HasColumnName("low_limit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("name");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("unit");

                    b.HasKey("Id");

                    b.ToTable("AnalogOutputs");
                });

            modelBuilder.Entity("scada_back.Models.DigitalInput", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("address");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("description");

                    b.Property<int>("DriverId")
                        .HasColumnType("int")
                        .HasColumnName("driver");

                    b.Property<int>("Function")
                        .HasColumnType("int")
                        .HasColumnName("function");

                    b.Property<bool>("IsScanning")
                        .HasColumnType("bit")
                        .HasColumnName("is_scanning");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("name");

                    b.Property<int>("ScanTime")
                        .HasColumnType("int")
                        .HasColumnName("scan_time");

                    b.HasKey("Id");

                    b.ToTable("DigitalInputs");
                });

            modelBuilder.Entity("scada_back.Models.DigitalOutput", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("address");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("description");

                    b.Property<int>("InitialValue")
                        .HasColumnType("int")
                        .HasColumnName("initial_value");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("DigitalOutputs");
                });

            modelBuilder.Entity("scada_back.Models.Driver", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("scada_back.Models.RealTimeUnit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("address");

                    b.Property<double>("HighLimit")
                        .HasColumnType("float")
                        .HasColumnName("high_limit");

                    b.Property<double>("LowLimit")
                        .HasColumnType("float")
                        .HasColumnName("low_limit");

                    b.HasKey("Id");

                    b.ToTable("RealTimeUnits");
                });

            modelBuilder.Entity("scada_back.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("password");

                    b.Property<int>("Role")
                        .HasColumnType("int")
                        .HasColumnName("role");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("scada_back.Models.Alarm", b =>
                {
                    b.HasOne("scada_back.Models.AnalogInput", "TagId")
                        .WithMany("Alarms")
                        .HasForeignKey("TagIdId");

                    b.Navigation("TagId");
                });

            modelBuilder.Entity("scada_back.Models.AnalogInput", b =>
                {
                    b.Navigation("Alarms");
                });
#pragma warning restore 612, 618
        }
    }
}
