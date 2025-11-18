using MediatR;
using Warehouse.Application.PurchaseOrders.Common;
using System.Collections.Generic;

namespace Warehouse.Application.PurchaseOrders.Queries.GetPurchaseOrders;

public record GetPurchaseOrdersQuery(short? Status = null, int Page = 1, int PageSize = 10) : IRequest<IReadOnlyList<PurchaseOrderDto>>;
