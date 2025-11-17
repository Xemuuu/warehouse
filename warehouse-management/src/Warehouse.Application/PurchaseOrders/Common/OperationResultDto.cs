using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Application.PurchaseOrders.Common;

public record OperationResultDto
{
    [Column("success")]
    public bool Success { get; init; }

    [Column("message")]
    public string Message { get; init; } = string.Empty;
}
