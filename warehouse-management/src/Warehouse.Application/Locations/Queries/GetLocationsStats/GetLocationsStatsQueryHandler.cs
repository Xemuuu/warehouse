using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Locations.Common;

namespace Warehouse.Application.Locations.Queries.GetLocationsStats;

public class GetLocationsStatsQueryHandler : IRequestHandler<GetLocationsStatsQuery, IReadOnlyList<LocationStatsDto>>
{
    private readonly IWarehouseDbContext _dbContext;

    public GetLocationsStatsQueryHandler(IWarehouseDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<LocationStatsDto>> Handle(
        GetLocationsStatsQuery request, 
        CancellationToken cancellationToken)
    {
        var results = await _dbContext.Database
            .SqlQueryRaw<LocationStatsDto>(
                @"SELECT * FROM production.get_locations_stats()"
            )
            .ToListAsync(cancellationToken);

        return results;
    }
}
