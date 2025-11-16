using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Application.Dashboard.Common;

public record DashboardStatsDto
{
    [Column("totalproducts")]
    public long TotalProducts { get; init; }
    
    [Column("totallocations")]
    public long TotalLocations { get; init; }
    
    [Column("totalvalue")]
    public decimal TotalValue { get; init; }
    
    [Column("lowstockcount")]
    public long LowStockCount { get; init; }
}
