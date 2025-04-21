using Microsoft.EntityFrameworkCore;

namespace Electronic.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ProductCategoryMst> ProductCategoryMsts { get; set; }
        public DbSet<ProductMst> ProductMsts { get; set; }
        public DbSet<ProductImageMst> ProductImageMsts { get; set; }

    }
}
