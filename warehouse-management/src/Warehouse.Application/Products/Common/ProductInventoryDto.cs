namespace Warehouse.Application.Products.Common;

public record ProductInventoryDto
{
    public int ProductId { get; init; }
    public short LocationId { get; init; }
    public string LocationName { get; init; } = string.Empty;
    public string Shelf { get; init; } = string.Empty;
    public short Bin { get; init; }
    public short Quantity { get; init; }
    public short SafetyStockLevel { get; init; }
    
    public bool IsBelowSafetyStock => Quantity < SafetyStockLevel;
}
