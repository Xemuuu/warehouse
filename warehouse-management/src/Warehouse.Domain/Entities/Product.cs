namespace Warehouse.Domain.Entities;

/// <summary>
/// Product entity - READ ONLY (dane z AdventureWorks)
/// Nie tworzymy nowych produktów, tylko odczytujemy istniejące
/// </summary>
public class Product
{
    public int ProductId { get; private set; }
    public string Name { get; private set; } = null!;
    public string ProductNumber { get; private set; } = null!;
    public string? Color { get; private set; }
    public decimal ListPrice { get; private set; }
    public decimal StandardCost { get; private set; }
    public string? CategoryName { get; private set; }
    public string? SubcategoryName { get; private set; }
    public long TotalStock { get; private set; }

    // Private constructor - tylko EF Core może tworzyć instancje
    private Product() { }

    // Brak metod Create/Update - to read-only entity z bazy AdventureWorks
}
