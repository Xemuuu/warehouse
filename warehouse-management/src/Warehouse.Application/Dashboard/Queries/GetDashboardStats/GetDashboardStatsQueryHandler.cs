using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Dashboard.Common;

namespace Warehouse.Application.Dashboard.Queries.GetDashboardStats;

public class GetDashboardStatsQueryHandler : IRequestHandler<GetDashboardStatsQuery, DashboardStatsDto>
{
    private readonly IWarehouseDbContext _dbContext;

    public GetDashboardStatsQueryHandler(IWarehouseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<DashboardStatsDto> Handle(
        GetDashboardStatsQuery request, 
        CancellationToken cancellationToken)
    {
        // Wywołanie stored procedure
        var result = await _dbContext.Database
            .SqlQueryRaw<DashboardStatsDto>(
                @"SELECT * FROM application.get_dashboard_stats()"
            )
            .FirstOrDefaultAsync(cancellationToken);

        if (result == null)
            throw new InvalidOperationException("Failed to retrieve dashboard statistics");

        return result;
    }
}
