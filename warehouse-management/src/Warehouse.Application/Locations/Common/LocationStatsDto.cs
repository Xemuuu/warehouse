using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Application.Locations.Common;

public record LocationStatsDto
{
    [Column("locationid")]
    public int LocationId { get; init; }
    
    [Column("locationname")]
    public string LocationName { get; init; } = string.Empty;
    
    [Column("productcount")]
    public long ProductCount { get; init; }
    
    [Column("lowstockcount")]
    public long LowStockCount { get; init; }
    
    [Column("totalvalue")]
    public decimal TotalValue { get; init; }
}
