﻿using Microsoft.EntityFrameworkCore;

namespace Electronic.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<ProductCategoryMst> ProductCategoryMsts { get; set; }

    }
}
