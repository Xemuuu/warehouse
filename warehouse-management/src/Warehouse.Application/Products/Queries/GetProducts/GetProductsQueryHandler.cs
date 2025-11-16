using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Common.Models;
using Warehouse.Application.Products.Common;

namespace Warehouse.Application.Products.Queries.GetProducts;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, PagedResult<ProductListItemDto>>
{
    private readonly IWarehouseDbContext _dbContext;

    public GetProductsQueryHandler(IWarehouseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PagedResult<ProductListItemDto>> Handle(
        GetProductsQuery request, 
        CancellationToken cancellationToken)
    {
        // Wywołanie stored procedure z obsługą null
        var results = await _dbContext.Database
            .SqlQueryRaw<ProductListItemDto>(
                @"SELECT * FROM production.get_products_with_filters({0}, {1}, {2}, {3}, {4}, {5}, {6}, {7})",
                (object?)request.Search ?? DBNull.Value,
                (object?)request.CategoryId ?? DBNull.Value,
                (object?)request.Color ?? DBNull.Value,
                (object?)request.MinPrice ?? DBNull.Value,
                (object?)request.MaxPrice ?? DBNull.Value,
                request.Page,
                request.PageSize,
                request.OrderBy
            )
            .ToListAsync(cancellationToken);

        // Pobierz totalCount z pierwszego wyniku (wszystkie wiersze mają tą samą wartość)
        var totalCount = results.FirstOrDefault()?.TotalCount ?? 0;

        return new PagedResult<ProductListItemDto>
        {
            Items = results,
            TotalCount = totalCount,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}
