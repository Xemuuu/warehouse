using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.PurchaseOrders.Common;

namespace Warehouse.Application.PurchaseOrders.Queries.GetPurchaseOrders;

public class GetPurchaseOrdersQueryHandler : IRequestHandler<GetPurchaseOrdersQuery, IReadOnlyList<PurchaseOrderDto>>
{
    private readonly IWarehouseDbContext _dbContext;

    public GetPurchaseOrdersQueryHandler(IWarehouseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<PurchaseOrderDto>> Handle(GetPurchaseOrdersQuery request, CancellationToken cancellationToken)
    {
        var results = await _dbContext.Database
            .SqlQueryRaw<PurchaseOrderDto>(
                @"SELECT * FROM purchasing.get_purchase_orders({0}::SMALLINT, {1})",  // Rzutowanie na SMALLINT
                (object?)request.Status ?? DBNull.Value,
                request.PageSize
            )
            .ToListAsync(cancellationToken);

        return results;
    }
}
