using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Application.PurchaseOrders.Common;
using Warehouse.Application.PurchaseOrders.Queries.GetPurchaseOrders;
using Warehouse.Application.PurchaseOrders.Commands.Approve;
using Warehouse.Application.PurchaseOrders.Commands.Reject;

namespace Warehouse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PurchaseOrdersController : ControllerBase
{
    private readonly ISender _sender;

    public PurchaseOrdersController(ISender sender)
    {
        _sender = sender;
    }

    /// <summary>
    /// Pobiera listę zamówień. Opcjonalny parametr status (1..4).
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] short? status = null)
    {
        var query = new GetPurchaseOrdersQuery(status);
        var result = await _sender.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Zatwierdza zamówienie (Pending -> Approved)
    /// </summary>
    [HttpPost("{id}/approve")]
    public async Task<IActionResult> Approve(int id)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var userId = Guid.TryParse(userIdClaim, out var uid) ? uid : Guid.Empty;

        var cmd = new ApprovePurchaseOrderCommand(id, userId);
        var result = await _sender.Send(cmd);
        if (result?.Success == true) return Ok(result);
        return BadRequest(result ?? new OperationResultDto { Success = false, Message = "Brak odpowiedzi" });
    }

    /// <summary>
    /// Odrzuca zamówienie (Pending -> Rejected)
    /// </summary>
    [HttpPost("{id}/reject")]
    public async Task<IActionResult> Reject(int id)
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var userId = Guid.TryParse(userIdClaim, out var uid) ? uid : Guid.Empty;

        var cmd = new RejectPurchaseOrderCommand(id, userId);
        var result = await _sender.Send(cmd);
        if (result?.Success == true) return Ok(result);
        return BadRequest(result ?? new OperationResultDto { Success = false, Message = "Brak odpowiedzi" });
    }
}
