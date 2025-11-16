using MediatR;
using Warehouse.Application.Products.Common;

namespace Warehouse.Application.Products.Queries.GetProductById;

public record GetProductByIdQuery(
    int ProductId
) : IRequest<ProductDetailsDto>;
