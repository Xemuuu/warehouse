using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.PurchaseOrders.Common;

namespace Warehouse.Application.PurchaseOrders.Commands.Approve;

public class ApprovePurchaseOrderCommandHandler : IRequestHandler<ApprovePurchaseOrderCommand, OperationResultDto>
{
    private readonly IWarehouseDbContext _dbContext;

    public ApprovePurchaseOrderCommandHandler(IWarehouseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<OperationResultDto> Handle(ApprovePurchaseOrderCommand request, CancellationToken cancellationToken)
    {
        var result = await _dbContext.Database
            .SqlQueryRaw<OperationResultDto>(
                @"SELECT * FROM purchasing.approve_purchase_order({0}, {1}::UUID)",
                request.PurchaseOrderId,
                request.UserId.ToString()
            )
            .FirstOrDefaultAsync(cancellationToken);

        return result ?? new OperationResultDto { Success = false, Message = "Brak odpowiedzi z DB" };
    }
}
