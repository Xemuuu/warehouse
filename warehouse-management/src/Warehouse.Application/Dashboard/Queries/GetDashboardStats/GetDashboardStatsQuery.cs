using MediatR;
using Warehouse.Application.Dashboard.Common;

namespace Warehouse.Application.Dashboard.Queries.GetDashboardStats;

public record GetDashboardStatsQuery : IRequest<DashboardStatsDto>;
