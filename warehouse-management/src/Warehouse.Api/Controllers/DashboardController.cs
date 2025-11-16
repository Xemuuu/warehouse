using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Application.Dashboard.Common;
using Warehouse.Application.Dashboard.Queries.GetDashboardStats;

namespace Warehouse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly ISender _sender;

    public DashboardController(ISender sender)
    {
        _sender = sender;
    }

    /// <summary>
    /// Pobiera statystyki dashboard (liczba produktów, lokalizacji, wartość magazynu, produkty poniżej minimum)
    /// </summary>
    [HttpGet("stats")]
    public async Task<ActionResult<DashboardStatsDto>> GetStats()
    {
        var query = new GetDashboardStatsQuery();
        var result = await _sender.Send(query);
        return Ok(result);
    }
}
