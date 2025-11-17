using MediatR;
using Warehouse.Application.PurchaseOrders.Common;

namespace Warehouse.Application.PurchaseOrders.Commands.Reject;

public record RejectPurchaseOrderCommand(int PurchaseOrderId, Guid UserId) : IRequest<OperationResultDto>;
