using Microsoft.EntityFrameworkCore;


namespace ToDoApp.DAL.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<ToDoTasks> ToDoTasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDoTasks>().HasOne<User>(u => u.UserNavigation).WithMany(t => t.ToDoTasksNavigation).HasForeignKey(u => u.Uid).IsRequired().OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<User>().HasIndex(e => e.Email).IsUnique();
        }

    }
}
