using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Application.Products.Common;

public record ProductListItemDto
{
    [Column("productid")]
    public int ProductId { get; init; }
    
    [Column("productname")]
    public string ProductName { get; init; } = string.Empty;
    
    [Column("productnumber")]
    public string ProductNumber { get; init; } = string.Empty;
    
    [Column("color")]
    public string? Color { get; init; }
    
    [Column("listprice")]
    public decimal ListPrice { get; init; }
    
    [Column("standardcost")]
    public decimal StandardCost { get; init; }
    
    [Column("categoryname")]
    public string? CategoryName { get; init; }
    
    [Column("subcategoryname")]
    public string? SubcategoryName { get; init; }
    
    [Column("totalstock")]
    public long TotalStock { get; init; }
    
    [Column("locationnames")]
    public string? LocationNames { get; init; }
    
    [Column("totalcount")]
    public long TotalCount { get; init; }
}
