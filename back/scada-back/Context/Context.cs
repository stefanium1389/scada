﻿using Microsoft.EntityFrameworkCore;
using scada_back.Models;

namespace scada_back.Context
{
    public class ScadaDbContext : DbContext
    {
        public ScadaDbContext(DbContextOptions options) : base(options)
        {
            this.ChangeTracker.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        //public DbSet<Driver> Drivers { get; set; }

        public DbSet<Alarm> Alarms { get; set; }
        public DbSet<AnalogInput> AnalogInputs { get; set; }
        public DbSet<AnalogOutput> AnalogOutputs { get; set; }
        public DbSet<DigitalInput> DigitalInputs { get; set; }
        public DbSet<DigitalOutput> DigitalOutputs { get; set; }
        public DbSet<RealTimeUnit> RealTimeUnits { get; set; }
        public DbSet<AnalogInputValue> AnalogInputValues { get; set; }
        public DbSet<DigitalInputValue> DigitalInputValues { get; set; }
        public DbSet<AnalogOutputValue> AnalogOutputValues { get; set; }
        public DbSet<DigitalOutputValue> DigitalOutputValues { get; set; }
        public DbSet<ActivatedAlarm> ActivatedAlarms { get; set;}
    }
}
