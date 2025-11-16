using MediatR;
using Warehouse.Application.Products.Common;

namespace Warehouse.Application.Products.Queries.GetProductInventory;

public record GetProductInventoryQuery(
    int ProductId
) : IRequest<IReadOnlyList<ProductInventoryDto>>;
