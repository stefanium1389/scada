using Microsoft.EntityFrameworkCore;
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
    }
}
