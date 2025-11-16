namespace Warehouse.Application.Products.Common;

public record ProductListItemDto
{
    public int ProductId { get; init; }
    public string ProductName { get; init; } = string.Empty;
    public string ProductNumber { get; init; } = string.Empty;
    public string? Color { get; init; }
    public decimal ListPrice { get; init; }
    public decimal StandardCost { get; init; }
    public string? CategoryName { get; init; }
    public string? SubcategoryName { get; init; }
    public long TotalStock { get; init; }
    public long TotalCount { get; init; }
}
