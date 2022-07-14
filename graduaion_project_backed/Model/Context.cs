using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace graduaion_project_backed.Model
{
    public class Context :IdentityDbContext<ApplicationUser>


    {

        public Context()
        {

        }

        public Context(DbContextOptions options):base(options) 
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source =.; Initial Catalog = GraduateProject; Integrated Security = True");
            base.OnConfiguring(optionsBuilder);
        }
        public virtual DbSet<controllers> Controllers { get; set; }
        public virtual DbSet<Premssion> Premssions { get; set; }
        public virtual DbSet<PremissionRoleController> PremissionRoleControllers { get; set; }

        public virtual DbSet<CustomRole> CustomRoles { get; set; }

        public virtual DbSet<Branches> Branches { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<Order> Orders { get; set; }


    }
}
