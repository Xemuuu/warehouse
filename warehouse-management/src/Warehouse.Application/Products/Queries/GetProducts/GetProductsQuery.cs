using MediatR;
using Warehouse.Application.Common.Models;
using Warehouse.Application.Products.Common;

namespace Warehouse.Application.Products.Queries.GetProducts;

public record GetProductsQuery(
    string? Search = null,
    int? CategoryId = null,
    string? Color = null,
    decimal? MinPrice = null,
    decimal? MaxPrice = null,
    short? LocationId = null,  // ✅ DODANE
    int Page = 1,
    int PageSize = 20,
    string OrderBy = "name"
) : IRequest<PagedResult<ProductListItemDto>>;
