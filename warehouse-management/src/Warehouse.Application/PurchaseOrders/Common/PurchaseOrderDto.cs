using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Application.PurchaseOrders.Common;

public record PurchaseOrderDto
{
    [Column("purchaseorderid")]
    public int PurchaseOrderId { get; init; }

    [Column("ordernumber")]
    public string OrderNumber { get; init; } = string.Empty;

    [Column("orderdate")]
    public DateTime OrderDate { get; init; }

    [Column("shipdate")]
    public DateTime? ShipDate { get; init; }

    [Column("status")]
    public short Status { get; init; }

    [Column("statusname")]
    public string StatusName { get; init; } = string.Empty;

    [Column("vendorid")]
    public int VendorId { get; init; }

    [Column("vendorname")]
    public string VendorName { get; init; } = string.Empty;

    [Column("totalproducts")]
    public long TotalProducts { get; init; }

    [Column("subtotal")]
    public decimal Subtotal { get; init; }
}
