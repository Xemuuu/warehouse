using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Products.Common;

namespace Warehouse.Application.Products.Queries.GetProductById;

public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDetailsDto>
{
    private readonly IWarehouseDbContext _dbContext;

    public GetProductByIdQueryHandler(IWarehouseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ProductDetailsDto> Handle(
        GetProductByIdQuery request, 
        CancellationToken cancellationToken)
    {
        // 1. Pobierz dane produktu (używamy get_products_with_filters z filtrem po ID)
        var productData = await _dbContext.Database
            .SqlQueryRaw<ProductListItemDto>(
                @"SELECT * FROM production.get_products_with_filters(NULL, NULL, NULL, NULL, NULL, 1, 1, 'name')"
            )
            .Where(p => p.ProductId == request.ProductId)
            .FirstOrDefaultAsync(cancellationToken);

        if (productData == null)
            throw new KeyNotFoundException($"Product with ID {request.ProductId} not found");

        // 2. Pobierz stany w lokalizacjach
        var inventory = await _dbContext.Database
            .SqlQueryRaw<ProductInventoryDto>(
                @"SELECT * FROM production.get_product_inventory({0})",
                request.ProductId
            )
            .ToListAsync(cancellationToken);

        // 3. Mapowanie na ProductDetailsDto
        return new ProductDetailsDto
        {
            ProductId = productData.ProductId,
            ProductName = productData.ProductName,
            ProductNumber = productData.ProductNumber,
            Color = productData.Color,
            ListPrice = productData.ListPrice,
            StandardCost = productData.StandardCost,
            CategoryName = productData.CategoryName,
            SubcategoryName = productData.SubcategoryName,
            TotalStock = productData.TotalStock,
            Inventory = inventory
        };
    }
}
