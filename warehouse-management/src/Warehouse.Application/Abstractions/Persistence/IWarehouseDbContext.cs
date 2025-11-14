using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Warehouse.Domain.Aggregates;

namespace Warehouse.Application.Abstractions.Persistence;

public interface IWarehouseDbContext
{
    DbSet<User> Users { get; }
    
    DatabaseFacade Database { get; }  // ✅ Dodane - pozwala na raw SQL
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
