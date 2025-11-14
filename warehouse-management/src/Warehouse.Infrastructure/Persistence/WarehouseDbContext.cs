using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Domain.Aggregates;

namespace Warehouse.Infrastructure.Persistence;

public class WarehouseDbContext : DbContext, IWarehouseDbContext
{
    public WarehouseDbContext(DbContextOptions<WarehouseDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users => Set<User>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Aplikuj wszystkie konfiguracje z assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(WarehouseDbContext).Assembly);
    }
}
