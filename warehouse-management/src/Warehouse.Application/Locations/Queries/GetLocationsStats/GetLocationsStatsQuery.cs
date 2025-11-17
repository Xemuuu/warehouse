using MediatR;
using Warehouse.Application.Locations.Common;

namespace Warehouse.Application.Locations.Queries.GetLocationsStats;

public record GetLocationsStatsQuery : IRequest<IReadOnlyList<LocationStatsDto>>;
