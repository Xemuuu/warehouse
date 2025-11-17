using MediatR;
using Warehouse.Application.PurchaseOrders.Common;

namespace Warehouse.Application.PurchaseOrders.Commands.Approve;

public record ApprovePurchaseOrderCommand(int PurchaseOrderId, Guid UserId) : IRequest<OperationResultDto>;
