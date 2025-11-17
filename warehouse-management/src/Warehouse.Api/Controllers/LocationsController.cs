using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Application.Locations.Common;
using Warehouse.Application.Locations.Queries.GetLocationsStats;

namespace Warehouse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LocationsController : ControllerBase
{
    private readonly ISender _sender;

    public LocationsController(ISender sender)
    {
        _sender = sender;
    }

    /// <summary>
    /// Pobiera statystyki wszystkich lokalizacji magazynowych
    /// </summary>
    [HttpGet("stats")]
    public async Task<ActionResult<IReadOnlyList<LocationStatsDto>>> GetLocationsStats()
    {
        var query = new GetLocationsStatsQuery();
        var result = await _sender.Send(query);
        return Ok(result);
    }
}
