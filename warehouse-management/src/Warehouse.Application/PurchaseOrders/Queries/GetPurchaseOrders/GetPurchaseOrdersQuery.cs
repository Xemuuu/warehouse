using MediatR;
using Warehouse.Application.PurchaseOrders.Common;
using System.Collections.Generic;

namespace Warehouse.Application.PurchaseOrders.Queries.GetPurchaseOrders;

public record GetPurchaseOrdersQuery(short? Status = null) : IRequest<IReadOnlyList<PurchaseOrderDto>>;
