using LoreTrackerAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using System.Globalization;
using System.Text;

namespace LoreTrackerAPI.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<World> Worlds => Set<World>();
        public DbSet<Character> Characters => Set<Character>();
        public DbSet<Bbeg> Bbegs => Set<Bbeg>();
        public DbSet<Faction> Factions => Set<Faction>();
        public DbSet<Npc> Npcs => Set<Npc>();
        public DbSet<LoreEntry> LoreEntries => Set<LoreEntry>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<World>()
                .HasMany(w => w.Characters)
                .WithOne(c => c.World)
                .HasForeignKey(c => c.WorldId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<World>()
                .HasMany(w => w.Bbegs)
                .WithOne(b => b.World)
                .HasForeignKey(b => b.WorldId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<World>()
                .HasMany(w => w.Factions)
                .WithOne(f => f.World)
                .HasForeignKey(f => f.WorldId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<World>()
                .HasMany(w => w.Npcs)
                .WithOne(n => n.World)
                .HasForeignKey(n => n.WorldId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<World>()
                .HasMany(w => w.LoreEntries)
                .WithOne(l => l.World)
                .HasForeignKey(l => l.WorldId)
                .OnDelete(DeleteBehavior.Cascade);


            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                // Set table name to snake_case
                entity.SetTableName(ToSnakeCase(entity.GetTableName()));

                // Set column names to snake_case
                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(ToSnakeCase(property.Name));
                }

                // Set primary key names to snake_case (optional)
                foreach (var key in entity.GetKeys())
                {
                    key.SetName(ToSnakeCase(key.GetName()));
                }

                // Set foreign key names to snake_case (optional)
                foreach (var fk in entity.GetForeignKeys())
                {
                    fk.SetConstraintName(ToSnakeCase(fk.GetConstraintName()));
                }

                // Set index names to snake_case (optional)
                foreach (var index in entity.GetIndexes())
                {
                    index.SetDatabaseName(ToSnakeCase(index.GetDatabaseName()));
                }
            }
        }

        private static string ToSnakeCase(string name)
        {
            if (string.IsNullOrEmpty(name))
                return name;

            var stringBuilder = new StringBuilder();
            var previousCategory = default(UnicodeCategory?);

            for (int i = 0; i < name.Length; i++)
            {
                var c = name[i];
                if (char.IsUpper(c))
                {
                    var currentCategory = char.GetUnicodeCategory(c);
                    if (i > 0 && previousCategory != UnicodeCategory.SpaceSeparator)
                    {
                        stringBuilder.Append('_');
                    }
                    c = char.ToLowerInvariant(c);
                    previousCategory = currentCategory;
                }
                stringBuilder.Append(c);
            }

            return stringBuilder.ToString();
        }
    }
}
