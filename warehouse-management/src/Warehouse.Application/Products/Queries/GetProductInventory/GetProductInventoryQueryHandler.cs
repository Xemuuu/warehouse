using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Products.Common;

namespace Warehouse.Application.Products.Queries.GetProductInventory;

public class GetProductInventoryQueryHandler : IRequestHandler<GetProductInventoryQuery, IReadOnlyList<ProductInventoryDto>>
{
    private readonly IWarehouseDbContext _dbContext;

    public GetProductInventoryQueryHandler(IWarehouseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<ProductInventoryDto>> Handle(
        GetProductInventoryQuery request, 
        CancellationToken cancellationToken)
    {
        // Wywołanie stored procedure
        var results = await _dbContext.Database
            .SqlQueryRaw<ProductInventoryDto>(
                @"SELECT * FROM production.get_product_inventory({0})",
                request.ProductId
            )
            .ToListAsync(cancellationToken);

        return results;
    }
}
