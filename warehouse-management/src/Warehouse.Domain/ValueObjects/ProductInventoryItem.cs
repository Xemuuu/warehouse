namespace Warehouse.Domain.ValueObjects;

/// <summary>
/// Value Object reprezentujący stan produktu w konkretnej lokalizacji
/// </summary>
public class ProductInventoryItem
{
    public int ProductId { get; set; }
    public short LocationId { get; set; }
    public string LocationName { get; set; } = string.Empty;
    public string Shelf { get; set; } = string.Empty;
    public short Bin { get; set; }
    public short Quantity { get; set; }
    public short SafetyStockLevel { get; set; }

    // Konstruktor dla EF Core / mapowania z stored procedure
    public ProductInventoryItem() { }
}
